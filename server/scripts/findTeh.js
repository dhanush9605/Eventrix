import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const eventSchema = new mongoose.Schema({
    title: String,
    maxParticipants: Number
}, { strict: false });

const Event = mongoose.model('Event', eventSchema);

async function findTeh() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const events = await Event.find({ title: /teh/i });
        console.log(`Found ${events.length} matching events`);
        events.forEach(e => {
            console.log(`Title: "${e.title}", maxParticipants: ${e.maxParticipants}, ID: ${e._id}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

findTeh();
