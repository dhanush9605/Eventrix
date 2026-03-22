import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const eventSchema = new mongoose.Schema({
    title: String,
    maxParticipants: Number
}, { strict: false });

const Event = mongoose.model('Event', eventSchema);

async function listEvents() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const events = await Event.find().sort({ createdAt: -1 }).limit(10);
        events.forEach(e => {
            console.log(`Title: "${e.title}", maxParticipants: ${e.maxParticipants}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

listEvents();
