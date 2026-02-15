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

        // Check if already attended
        const alreadyAttended = event.attendance.some(a => a.studentId === studentId);
        if (alreadyAttended) {
            return res.status(400).json({ message: 'Attendance already marked' });
        }

        // Add to attendance
        event.attendance.push({ studentId });
        await event.save();

        res.status(200).json({
            success: true,
            message: 'Attendance marked successfully',
            studentName: student.name
        });
    } catch (error) {
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

export default router;
