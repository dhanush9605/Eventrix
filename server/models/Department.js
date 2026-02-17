import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    headOfDepartment: {
        type: String,
        default: ''
    },
    facultyCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Department', departmentSchema);
