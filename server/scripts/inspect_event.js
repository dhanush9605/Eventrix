import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, '../.env') });

import Event from '../models/Event.js';

const inspectEvent = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find event by title or ID (using the one we saw earlier if possible, or just regex)
        const event = await Event.findOne({ title: /tech/i });

        if (!event) {
            console.log("Event 'tech' not found.");
        } else {
            console.log(`Event Found: ${event.title}`);
            console.log(`ID: ${event._id}`);
            console.log(`Date: ${event.date} (Type: ${typeof event.date})`);

            const today = new Date().toISOString().split('T')[0];
            console.log(`Today's Date (for comparison): ${today}`);

            if (event.date < today) {
                console.log("Status: PAST EVENT (Filtered out by >= today's date check)");
            } else {
                console.log("Status: ID ACTIVE/UPCOMING");
            }
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

inspectEvent();
