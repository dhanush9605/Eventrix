import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventrix')
    .then(async () => {
        console.log('Connected to MongoDB');
        const users = await User.find({ role: 'faculty' }).limit(5);
        console.log('Sample Faculty:', JSON.stringify(users, null, 2));
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
