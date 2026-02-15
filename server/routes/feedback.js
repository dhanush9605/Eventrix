import express from 'express';
import Feedback from '../models/Feedback.js';
import Event from '../models/Event.js';

const router = express.Router();

// Submit Feedback
router.post('/', async (req, res) => {
    try {
        const { eventId, studentId, studentName, rating, comment } = req.body;

        // 1. Verify event exists
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // 2. Check if student is registered for this event
        const isRegistered = event.registrations.some(reg => reg.studentId === studentId);
        if (!isRegistered) {
            return res.status(403).json({ message: 'You must be registered for this event to leave feedback.' });
        }

        // 3. Create feedback
        const feedback = await Feedback.create({
            eventId,
            studentId,
            studentName,
            rating,
            comment
        });

        res.status(201).json(feedback);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already submitted feedback for this event.' });
        }
        res.status(500).json({ message: 'Error submitting feedback', error: error.message });
    }
});

// Get Feedback for an Event
router.get('/event/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const feedbacks = await Feedback.find({ eventId }).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback' });
    }
});

// Get Rating Stats (Average rating per event)
router.get('/stats', async (req, res) => {
    try {
        const stats = await Feedback.aggregate([
            {
                $group: {
                    _id: '$eventId',
                    averageRating: { $avg: '$rating' },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

export default router;
