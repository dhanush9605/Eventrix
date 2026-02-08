import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js';

const router = express.Router();

// Create Event
router.post('/', async (req, res) => {
    try {
        const { title, date, location, description, facultyId } = req.body;
        const newEvent = await Event.create({
            title, date, location, description, facultyId
        });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event' });
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
        const { studentId } = req.body; // e.g., STU-2026-0001

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
        event.registrations.push({ studentId });
        await event.save();

        res.status(200).json({ success: true, message: 'Successfully registered' });
    } catch (error) {
        console.error("Error registering:", error); // Log actual error
        res.status(500).json({ message: 'Error registering for event' });
    }
});

export default router;
