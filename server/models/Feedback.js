import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    studentId: {
        type: String, // STU-xxxx
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Prevent duplicate feedback from the same student for the same event
feedbackSchema.index({ eventId: 1, studentId: 1 }, { unique: true });

export default mongoose.model('Feedback', feedbackSchema);
