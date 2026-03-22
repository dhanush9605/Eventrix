import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const eventSchema = new mongoose.Schema({
    title: String,
    maxParticipants: Number
}, { strict: false });

const Event = mongoose.model('Event', eventSchema);

async function find49() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const events = await Event.find({ maxParticipants: 49 });
        console.log(`Found ${events.length} events with 49 maxParticipants`);
        events.forEach(e => {
            console.log(`Title: "${e.title}", ID: ${e._id}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

find49();
