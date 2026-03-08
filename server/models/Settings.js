import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    maintenanceMode: { type: Boolean, default: false },
    studentRegistration: { type: Boolean, default: true },
    facultyRegistration: { type: Boolean, default: true },
    publicLeaderboards: { type: Boolean, default: true }
}, { timestamps: true });

// We only need one document for global settings
// Mongoose doesn't have a strict singleton built-in natively without a plugin, 
// so we'll just handle it by always using a specific ID or $setOnInsert in the route.
export default mongoose.model('Settings', settingsSchema);
