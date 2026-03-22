import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const eventSchema = new mongoose.Schema({
    title: String,
    facultyId: String,
    organizingBody: String
}, { strict: false });

const Event = mongoose.model('Event', eventSchema);

async function checkEvents() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const events = await Event.find().limit(5);
        console.log('--- Sample Events ---');
        events.forEach(e => {
            console.log(`Title: ${e.title}, FacultyId: ${e.facultyId}, Organizer: ${e.organizingBody}`);
        });
        console.log('----------------------');
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkEvents();
