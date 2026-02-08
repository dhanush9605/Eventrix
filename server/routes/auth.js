import express from 'express';
import User from '../models/User.js';
import Counter from '../models/Counter.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to generate unique ID with atomic counter
const generateUniqueId = async (role) => {
    const prefix = role === 'student' ? 'STU' : 'FAC';
    const year = new Date().getFullYear();

    // Ensure counter exists/is initialized
    // We try to increment. If it doesn't exist, we might need to init it.
    // Mongoose findOneAndUpdate with upsert creates it with default 0 if not found, then increments.
    // BUT if we have existing users, starting from 0 is bad.
    // Simple strategy: Optimistic upsert. If seq is 1, check if we might have existing users and correct it?
    // Better: Assume this script runs once to init counters or we do a smart check.
    // To be safe for existing data without manual migration:

    // Check if counter exists first? No, that's a race calc.
    // Let's rely on findOneAndUpdate.

    // However, to handle the "Existing Data" case safely:
    // We can do this: 
    // If Counter doesn't exist, we find MAX ID from User table.
    // This lock/init logic is complex to do atomically without a separate init script.
    // Given the task is to refactor for race conditions, using Counter is the standard way.
    // I will assume for this Refactor that we start fresh OR the user runs a migration.
    // But to be nice, I'll add a lazy init block:

    let counter = await Counter.findByIdAndUpdate(
        { _id: role },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    // If seq is 1, it might be a new counter. Check if we have collisions (users exist)?
    if (counter.seq === 1) {
        const lastUser = await User.findOne({ role }).sort({ createdAt: -1 });
        if (lastUser) {
            const lastId = role === 'student' ? lastUser.studentId : lastUser.facultyId;
            if (lastId) {
                const parts = lastId.split('-');
                if (parts.length === 3 && parseInt(parts[1]) === year) {
                    const lastNum = parseInt(parts[2], 10);
                    // Update counter to match lastNum + 1
                    counter = await Counter.findByIdAndUpdate(
                        { _id: role },
                        { $set: { seq: lastNum + 1 } },
                        { new: true }
                    );
                }
            }
        }
    }

    const numStr = counter.seq.toString().padStart(4, '0');
    return `${prefix}-${year}-${numStr}`;
};

// Validation Middleware
const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['student', 'faculty']).withMessage('Invalid role'),
    body('department').notEmpty().withMessage('Department is required')
];

// Register
router.post('/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    try {
        const { name, email, password, role, department, year } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate Unique ID
        let uniqueIdData = {};
        if (role === 'student' || role === 'faculty') {
            const uniqueId = await generateUniqueId(role);
            if (role === 'student') uniqueIdData.studentId = uniqueId;
            if (role === 'faculty') uniqueIdData.facultyId = uniqueId;
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            department,
            year: year || new Date().getFullYear().toString(),
            ...uniqueIdData
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ result: newUser, token });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
});

// Login
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid inputs' });
    }

    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'User does not exist' });

        if (existingUser.status === 'Blocked') {
            return res.status(403).json({ message: 'Account is blocked. Contact admin.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Google Auth Init
router.post('/google', async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.status === 'Blocked') {
                return res.status(403).json({ message: 'Account is blocked. Contact admin.' });
            }
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ result: existingUser, token });
        } else {
            // Return flag to frontend to show "Complete Registration" modal
            return res.status(200).json({
                isNew: true,
                googleData: { email, name, picture, googleId }
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Google Auth failed' });
        console.error(error);
    }
});

// Google Auth Complete Registration
router.post('/google/complete', [
    body('role').isIn(['student', 'faculty']).withMessage('Invalid role'),
    body('department').notEmpty().withMessage('Department is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
        const { name, email, googleId, picture, role, department, year } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Generate Unique ID
        let uniqueIdData = {};
        if (role === 'student' || role === 'faculty') {
            const uniqueId = await generateUniqueId(role);
            if (role === 'student') uniqueIdData.studentId = uniqueId;
            if (role === 'faculty') uniqueIdData.facultyId = uniqueId;
        }

        const newUser = await User.create({
            name,
            email,
            googleId,
            picture,
            role,
            department,
            year: year || new Date().getFullYear().toString(),
            ...uniqueIdData
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.error(error);
    }
});

export default router;
