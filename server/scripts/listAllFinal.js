import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const eventSchema = new mongoose.Schema({
    title: String,
    maxParticipants: Number
}, { strict: false });

const Event = mongoose.model('Event', eventSchema);

async function listAll() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const events = await Event.find().sort({ createdAt: -1 });
        console.log(`Total events: ${events.length}`);
        events.forEach(e => {
            console.log(`[${e._id}] Title: "${e.title}", Max: ${e.maxParticipants}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

listAll();
