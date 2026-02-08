import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, '../.env') });

import User from '../models/User.js';
import Event from '../models/Event.js';

const registerCivilStudent = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Get Civil Student
        const civilStudent = await User.findOne({ department: { $regex: /civil/i }, role: 'student' });

        if (!civilStudent) {
            console.log('No Civil student found.');
            return;
        }
        console.log(`Found Civil Student: ${civilStudent.name} (${civilStudent.studentId})`);

        // 2. Get ANY event
        const event = await Event.findOne({});

        if (!event) {
            console.log('No event found.');
            return;
        }
        console.log(`Found Event: ${event.title} (${event._id})`);

        // 3. Register Student if not already
        const isRegistered = event.registrations.some(r => r.studentId === civilStudent.studentId);
        if (isRegistered) {
            console.log('Student is already registered.');
        } else {
            event.registrations.push({
                studentId: civilStudent.studentId,
                registeredAt: new Date(),
                status: 'Confirmed'
            });
            await event.save();
            console.log('Successfully registered Civil student to event.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

registerCivilStudent();
