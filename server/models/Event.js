import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, default: 'Technical' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    maxParticipants: { type: Number },
    deadline: { type: String },
    isPaid: { type: Boolean, default: false },
    fee: { type: Number },
    upiId: { type: String },
    paymentQr: { type: String }, // Base64 or URL
    bannerImage: { type: String }, // Base64 or URL
    facultyId: { type: String, required: true }, // The faculty who created it
    status: { type: String, default: 'active' }, // active, inactive, completed

    // Array of student IDs (e.g., STU-2026-0001) who attended
    attendance: [{
        studentId: String,
        markedAt: { type: Date, default: Date.now }
    }],

    // Array of student IDs who registered
    registrations: [{
        studentId: String,
        registeredAt: { type: Date, default: Date.now },
        status: { type: String, default: 'Confirmed' } // Confirmed, Cancelled
    }]
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
