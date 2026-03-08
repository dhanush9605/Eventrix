import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

// Create Event
router.post('/', upload.fields([{ name: 'bannerImage', maxCount: 1 }, { name: 'paymentQr', maxCount: 1 }]), async (req, res) => {
    try {
        const {
            title, category, date, time, location, description,
            maxParticipants, deadline, isPaid, fee, upiId,
            facultyId
        } = req.body;

        // Get Cloudinary URLs if files were uploaded
        let bannerImage = req.body.bannerImage; // Fallback if sent as string (e.g. from existing URL)
        let paymentQr = req.body.paymentQr;

        if (req.files) {
            if (req.files.bannerImage) {
                bannerImage = req.files.bannerImage[0].path;
            }
            if (req.files.paymentQr) {
                paymentQr = req.files.paymentQr[0].path;
            }
        }

        const newEvent = await Event.create({
            title, category, date, time, location, description,
            maxParticipants, deadline, isPaid, fee, upiId,
            paymentQr, bannerImage, facultyId
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
});

// Update Event
router.put('/:id', upload.fields([{ name: 'bannerImage', maxCount: 1 }, { name: 'paymentQr', maxCount: 1 }]), async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Update fields
        Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined && key !== 'facultyId') { // Don't allow changing facultyId
                event[key] = updates[key];
            }
        });

        // Update files if uploaded
        if (req.files) {
            if (req.files.bannerImage) {
                event.bannerImage = req.files.bannerImage[0].path;
            }
            if (req.files.paymentQr) {
                event.paymentQr = req.files.paymentQr[0].path;
            }
        }

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
});

// Get All Events (Optionally filter by faculty)
router.get('/', async (req, res) => {
    try {
        const { facultyId } = req.query;
        let query = {};
        if (facultyId) query = { facultyId };

        const events = await Event.find(query).sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// Get Event Details with Populated Registrations
router.get('/:id/details', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).lean();

        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.registrations && event.registrations.length > 0) {
            const studentIds = event.registrations.map(r => r.studentId).filter(Boolean);
            const students = await User.find({ studentId: { $in: studentIds } }, 'name email department year studentId').lean();

            event.registrations = event.registrations.map(reg => {
                const student = students.find(s => s.studentId === reg.studentId);
                return {
                    ...reg,
                    studentName: student ? student.name : 'Unknown',
                    studentEmail: student ? student.email : 'Unknown',
                    department: student ? student.department : 'Unknown',
                    year: student ? student.year : 'Unknown'
                };
            });
        }

        if (event.attendance && event.attendance.length > 0) {
            const attendanceStudentIds = event.attendance.map(a => a.studentId).filter(Boolean);
            const attendanceStudents = await User.find({ studentId: { $in: attendanceStudentIds } }, 'name email department year studentId').lean();

            event.attendance = event.attendance.map(att => {
                const student = attendanceStudents.find(s => s.studentId === att.studentId);
                return {
                    ...att,
                    studentName: student ? student.name : 'Unknown',
                    studentEmail: student ? student.email : 'Unknown',
                    department: student ? student.department : 'Unknown',
                    year: student ? student.year : 'Unknown'
                };
            });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event details:", error);
        res.status(500).json({ message: 'Error fetching event details' });
    }
});

// Mark Attendance
router.post('/:id/attendance', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.body; // e.g., STU-2026-0001

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Check if student exists
        const student = await User.findOne({ studentId });
        if (!student) return res.status(404).json({ message: 'Student ID not valid' });

        // Atomic update to avoid race conditions causing duplicates
        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: id,
                "attendance.studentId": { $ne: studentId }
            },
            {
                $push: { attendance: { studentId } }
            },
            { new: true }
        );

        if (!updatedEvent) {
            // If findOneAndUpdate returns null, it means the event wasn't found OR 
            // the condition `attendance.studentId != studentId` failed (meaning they are already attended)
            return res.status(400).json({ message: 'Attendance already marked' });
        }

        res.status(200).json({
            success: true,
            message: 'Attendance marked successfully',
            studentName: student.name
        });
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ message: 'Error marking attendance' });
    }
});

// Register for Event
router.post('/:id/register', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId, utr } = req.body; // e.g., STU-2026-0001

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Ensure registrations array exists
        if (!event.registrations) {
            event.registrations = [];
        }

        // Check for duplicate registration
        const alreadyRegistered = event.registrations.some(r => r.studentId === studentId);
        if (alreadyRegistered) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Add to registrations
        event.registrations.push({ studentId, utr });
        await event.save();

        res.status(200).json({ success: true, message: 'Successfully registered' });
    } catch (error) {
        console.error("Error registering:", error); // Log actual error
        res.status(500).json({ message: 'Error registering for event' });
    }
});

// Delete Event
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: 'Error deleting event' });
    }
});

// Get Events Attended by Student
router.get('/attended/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        // Find events where this studentId is in the attendance array
        const events = await Event.find({
            "attendance.studentId": studentId
        }).sort({ date: -1 });

        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching attended events:", error);
        res.status(500).json({ message: 'Error fetching attended events' });
    }
});

export default router;
