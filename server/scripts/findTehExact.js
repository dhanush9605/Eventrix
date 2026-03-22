import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const eventSchema = new mongoose.Schema({
    title: String,
    maxParticipants: Number
}, { strict: false });

const Event = mongoose.model('Event', eventSchema);

async function findTehExact() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const event = await Event.findOne({ title: "teh" });
        if (event) {
            console.log(`FOUND: Title="${event.title}", Max=${event.maxParticipants}`);
        } else {
            console.log('Title "teh" NOT FOUND');
        }
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}

findTehExact();
