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

const debugEngagement = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Get All Students
        const allStudents = await User.find({ role: 'student' });
        console.log(`\n--- ALL STUDENTS (${allStudents.length}) ---`);
        allStudents.forEach(s => console.log(`Name: ${s.name}, Dept: ${s.department}, ID: '${s.studentId}'`));

        // 2. Get All Event Registrations
        const events = await Event.find({});
        console.log(`\n--- ALL EVENTS (${events.length}) ---`);

        events.forEach(e => {
            console.log(`Event: ${e.title} (${e._id})`);
            if (e.registrations && e.registrations.length > 0) {
                e.registrations.forEach(r => {
                    console.log(`  - Registered StudentID: '${r.studentId}'`);
                });
            } else {
                console.log('  - No registrations');
            }
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

debugEngagement();
