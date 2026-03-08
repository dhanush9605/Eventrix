import express from 'express';
import Settings from '../models/Settings.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
    }
};

// Get current settings
router.get('/', async (req, res) => {
    try {
        // Use findOneAndUpdate with upsert to handle default settings creation atomically
        let settings = await Settings.findOneAndUpdate(
            {},
            {
                $setOnInsert: {
                    maintenanceMode: false,
                    studentRegistration: true,
                    facultyRegistration: true,
                    facultyRegistration: true,
                    publicLeaderboards: true,
                    maintenancePassword: 'maintain@888999'
                }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );

        res.json(settings);
    } catch (error) {
        console.error('CRITICAL: Error fetching/initializing settings:', error);
        res.status(500).json({
            message: 'Server error fetching system configuration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Update settings
router.put('/', auth, isAdmin, async (req, res) => {
    try {
        const { maintenanceMode, studentRegistration, facultyRegistration, publicLeaderboards } = req.body;

        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings();
        }

        if (maintenanceMode !== undefined) settings.maintenanceMode = maintenanceMode;
        if (studentRegistration !== undefined) settings.studentRegistration = studentRegistration;
        if (facultyRegistration !== undefined) settings.facultyRegistration = facultyRegistration;
        if (publicLeaderboards !== undefined) settings.publicLeaderboards = publicLeaderboards;
        if (req.body.maintenancePassword !== undefined) settings.maintenancePassword = req.body.maintenancePassword;

        await settings.save();

        res.json(settings);
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
