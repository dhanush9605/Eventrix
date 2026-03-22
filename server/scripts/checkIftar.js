import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const eventSchema = new mongoose.Schema({
    title: String,
    maxParticipants: Number,
    organizingBody: String,
    date: String
}, { strict: false });

const Event = mongoose.model('Event', eventSchema);

async function checkIftar() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const event = await Event.findOne({ title: "iftar party" });
        if (event) {
            console.log(JSON.stringify(event, null, 2));
        } else {
            console.log('Event not found');
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkIftar();
