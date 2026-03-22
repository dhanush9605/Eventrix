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
        const events = await Event.find().sort({ createdAt: -1 });
        console.log('--- ALL EVENTS ---');
        events.forEach(e => {
            console.log(`ID: ${e._id}, Title: "${e.title}", maxParticipants: ${e.maxParticipants}`);
        });
        console.log('-------------------');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

listEvents();
