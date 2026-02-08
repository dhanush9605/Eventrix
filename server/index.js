import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import adminRoutes from './routes/admin.js';
import seedAdmin from './scripts/createAdmin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet()); // Security Headers
app.use(express.json());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventrix')
    .then(() => {
        console.log('Connected to MongoDB');
        seedAdmin();
    })
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Eventrix Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
