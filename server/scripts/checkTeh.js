import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const eventSchema = new mongoose.Schema({
    title: String,
    maxParticipants: Number
}, { strict: false });

const Event = mongoose.model('Event', eventSchema);

async function checkEvent() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const event = await Event.findOne({ title: 'teh' });
        if (event) {
            console.log(`Event: ${event.title}, maxParticipants: ${event.maxParticipants}`);
        } else {
            console.log('Event not found');
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkEvent();
