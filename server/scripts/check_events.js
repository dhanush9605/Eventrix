import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkLinks = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const users = await User.find({});
        const events = await Event.find({});

        console.log(`Total Users: ${users.length}`);
        console.log(`Total Events: ${events.length}`);

        if (events.length > 0) {
            console.log("\n--- Event Ownership ---");
            events.forEach(e => {
                const creator = users.find(u => u._id.toString() === e.facultyId);
                if (creator) {
                    console.log(`Event: "${e.title}" (` + e._id + `)`);
                    console.log(`   -> Created by: ${creator.name} (${creator.email}) [${creator.role}]`);
                } else {
                    console.log(`Event: "${e.title}" (` + e._id + `)`);
                    console.log(`   -> Created by: UNKNOWN ID (${e.facultyId})`);
                }
            });
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
};

checkLinks();
