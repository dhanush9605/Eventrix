import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const fixData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const events = await Event.find({ $or: [{ time: { $exists: false } }, { time: null }, { time: '' }] });
        console.log(`Found ${events.length} events missing time field.`);

        for (const event of events) {
            console.log(`Fixing event: ${event.title || event._id}`);
            event.time = '10:00'; // Default time
            await event.save();
        }

        console.log('Data fix complete.');
    } catch (error) {
        console.error('Error during data fix:', error);
    } finally {
        await mongoose.disconnect();
    }
};

fixData();
