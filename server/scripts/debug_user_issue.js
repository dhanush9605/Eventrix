import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Event from '../models/Event.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = 'dhanush22rg173@vjcet.org';
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User ${email} not found`);
        } else {
            console.log('--- User Details ---');
            console.log(JSON.stringify(user, null, 2));

            const events = await Event.find({ facultyId: user._id.toString() });
            console.log(`\n--- Events for user ${user._id} (${user.name}) ---`);
            console.log(`Found ${events.length} events`);
            events.forEach(e => {
                console.log(`- ${e.title} (ID: ${e._id}, facultyId: ${e.facultyId})`);
            });

            // Also check for events with their facultyId field (the FAC-xxx one) just in case
            if (user.facultyId) {
                const eventsByFacId = await Event.find({ facultyId: user.facultyId });
                console.log(`\n--- Events for facultyId ${user.facultyId} ---`);
                console.log(`Found ${eventsByFacId.length} events`);
                eventsByFacId.forEach(e => {
                    console.log(`- ${e.title} (ID: ${e._id}, facultyId: ${e.facultyId})`);
                });
            }
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

debug();
