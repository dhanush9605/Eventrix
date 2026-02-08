import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to generate unique ID
const generateUniqueId = async (role) => {
    const prefix = role === 'student' ? 'STU' : 'FAC';
    const year = '2026'; // Fixed to 2026 as per requirement

    // Find the last user with this role to increment the counter
    // This is a simple implementation. For high concurrency, use a counter collection.
    const lastUser = await User.findOne({ role }).sort({ createdAt: -1 });

    let nextNum = 1;
    if (lastUser) {
        const lastId = role === 'student' ? lastUser.studentId : lastUser.facultyId;
        if (lastId) {
            const parts = lastId.split('-');
            if (parts.length === 3 && parts[1] === year) {
                nextNum = parseInt(parts[2], 10) + 1;
            }
        }
    }

    const numStr = nextNum.toString().padStart(4, '0');
    return `${prefix}-${year}-${numStr}`;
};

// Register
router.post('/register', async (req, res) => {
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
            year,
            ...uniqueIdData
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'User does not exist' });

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
        console.log(error);
    }
});

// Google Auth Complete Registration
router.post('/google/complete', async (req, res) => {
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
            role, // Default to 'student' if not passed, but frontend should pass it
            department,
            year,
            ...uniqueIdData
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
});

export default router;
