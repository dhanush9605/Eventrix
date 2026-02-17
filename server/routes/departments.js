import express from 'express';
import Department from '../models/Department.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

const router = express.Router();

// Get department hierarchy (Departments -> Faculty -> Events)
router.get('/hierarchy', async (req, res) => {
    try {
        // 1. Fetch all events (only upcoming or ongoing)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];

        const events = await Event.find({ date: { $gte: todayStr } }).sort({ date: 1 });

        // 2. Fetch all faculty members who have created events
        // We link Event.facultyId to User.facultyId (or User._id if that's how it's stored, but assuming facultyId field based on schema)
        // Actually, let's just fetch all faculty users to be safe and filter in memory
        const facultyUsers = await User.find({ role: 'faculty' });

        // 3. Group Events by Faculty
        const facultyMap = {}; // userId -> { userObj, events: [] }

        facultyUsers.forEach(user => {
            // Key by _id because that's what Event.facultyId seems to store based on debug
            const userId = user._id.toString();
            facultyMap[userId] = {
                ...user.toObject(),
                events: []
            };
        });

        // Distribute events to faculty
        events.forEach(event => {
            const facId = event.facultyId.toString();
            if (facultyMap[facId]) {
                facultyMap[facId].events.push(event);
            }
        });

        // 4. Group Faculty by Department
        const departmentsMap = {}; // deptName -> { faculty: [] }

        Object.values(facultyMap).forEach(faculty => {
            if (faculty.events.length > 0) { // Only include faculty with events
                const deptName = faculty.department;
                if (!departmentsMap[deptName]) {
                    departmentsMap[deptName] = {
                        name: deptName,
                        faculty: [],
                        totalEvents: 0
                    };
                }
                departmentsMap[deptName].faculty.push(faculty);
                departmentsMap[deptName].totalEvents += faculty.events.length;
            }
        });

        // 5. Convert to array
        const hierarchy = Object.values(departmentsMap).sort((a, b) => b.totalEvents - a.totalEvents);

        res.status(200).json(hierarchy);
    } catch (error) {
        console.error('Error fetching hierarchy:', error);
        res.status(500).json({ message: 'Error fetching hierarchy', error: error.message });
    }
});

// Get all departments
router.get('/', async (req, res) => {
    try {
        const departments = await Department.find().sort({ name: 1 });
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error: error.message });
    }
});

// Create a new department
router.post('/', async (req, res) => {
    try {
        const { name, code, headOfDepartment } = req.body;

        const existingDept = await Department.findOne({ $or: [{ name }, { code }] });
        if (existingDept) {
            return res.status(400).json({ message: 'Department with this name or code already exists' });
        }

        const newDepartment = await Department.create({
            name,
            code,
            headOfDepartment
        });

        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating department', error: error.message });
    }
});

// Update a department
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const department = await Department.findByIdAndUpdate(id, updates, { new: true });

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: 'Error updating department', error: error.message });
    }
});

// Delete a department
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findByIdAndDelete(id);

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting department', error: error.message });
    }
});

export default router;
