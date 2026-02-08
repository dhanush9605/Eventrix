import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional if using Google Sign-In
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        default: 'student'
    },
    status: {
        type: String,
        enum: ['Active', 'Blocked', 'Pending'],
        default: 'Active'
    },
    department: { type: String, required: true },

    // Specific Fields
    studentId: { type: String, unique: true, sparse: true }, // e.g., STU-2026-0001
    facultyId: { type: String, unique: true, sparse: true }, // e.g., FAC-2026-0001
    year: { type: String }, // For students

    // Google Auth
    googleId: { type: String, unique: true, sparse: true },
    picture: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
