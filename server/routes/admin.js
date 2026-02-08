import express from 'express';
import User from '../models/User.js';
import Event from '../models/Event.js';

const router = express.Router();

// Get Admin Overview Stats
router.get('/stats', async (req, res) => {
    try {
        // 1. Basic Counts
        const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
        const activeEvents = await Event.countDocuments({
            date: { $gte: new Date().toISOString().split('T')[0] }
        });
        // Departments should only include those with students/faculty
        // Aggregation is better here to filter users first, then get departments
        const departments = await User.distinct('department', { role: { $ne: 'admin' } });
        const totalDepartments = departments.length;

        // 2. Engagement (Unique students registered currently / Total students)
        const totalStudents = await User.countDocuments({ role: 'student' });
        const events = await Event.find({});
        const uniqueStudentsRegistered = new Set();
        events.forEach(event => {
            event.registrations.forEach(reg => {
                if (reg.studentId) uniqueStudentsRegistered.add(reg.studentId);
            });
        });

        const engagement = totalStudents > 0
            ? Math.round((uniqueStudentsRegistered.size / totalStudents) * 100)
            : 0;

        // 3. Registrations Over Time (Last 7 Days)
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            last7Days.push(d.toISOString().split('T')[0]);
        }

        const registrationChart = await Promise.all(last7Days.map(async (date) => {
            // Find events that had registrations on this date (simulated by checking event date for now or registration timestamp if available)
            // Ideally we check registration.registeredAt, but for simplicity let's count registrations made on events OF that date
            // Better: Aggregation on registrations array.
            // Let's stick to a simpler approximation for MVP: Count registrations where registeredAt matches date

            // To do this accurately without unwinding efficiently in code, let's just fetch all events and filter in JS for this MVP size
            let count = 0;
            events.forEach(event => {
                event.registrations.forEach(reg => {
                    if (reg.registeredAt) {
                        const regDate = new Date(reg.registeredAt).toISOString().split('T')[0];
                        if (regDate === date) count++;
                    }
                });
            });
            return { name: date.slice(5), registrations: count };
        }));

        // 4. Recent Activity
        // Get last 5 events created
        const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(5).lean();
        const mappedEvents = recentEvents.map(e => ({
            type: 'event',
            user: 'Faculty', // We need to fetch faculty name ideally, but let's place holder
            action: 'created a new event',
            target: e.title,
            time: e.createdAt
        }));

        // We can mix in registrations too if we want, but let's start with events for "Recent Activity" to be fast
        const orderedActivity = mappedEvents; // .sort((a,b) => b.time - a.time) if verified

        res.json({
            stats: {
                totalUsers,
                activeEvents,
                departments: totalDepartments,
                engagement
            },
            chartData: registrationChart,
            recentActivity: orderedActivity
        });

    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Detailed Stats (Users List or Department Breakdown)
router.get('/stats/details', async (req, res) => {
    try {
        const { type } = req.query;

        if (type === 'users') {
            const users = await User.find({ role: { $ne: 'admin' } }, 'name email role department status year studentId facultyId').lean();
            return res.json(users);
        }

        if (type === 'departments') {
            const users = await User.find({ role: { $ne: 'admin' } }, 'department role').lean();
            const deptMap = {};

            users.forEach(user => {
                if (!user.department) return;
                if (!deptMap[user.department]) {
                    deptMap[user.department] = { name: user.department, total: 0, students: 0, faculty: 0 };
                }
                deptMap[user.department].total++;
                if (user.role === 'student') deptMap[user.department].students++;
                if (user.role === 'faculty') deptMap[user.department].faculty++;
            });

            const departments = Object.values(deptMap).sort((a, b) => b.total - a.total);
            return res.json(departments);
        }

        if (type === 'events') {
            // Fetch all events, sorted by date (newest/future first)
            const events = await Event.find({}).sort({ date: -1 }).lean();

            // Add registration counts & status
            const today = new Date().toISOString().split('T')[0];
            const eventsWithCounts = events.map(e => ({
                id: e._id,
                title: e.title,
                date: e.date,
                location: e.location,
                registeredCount: e.registrations ? e.registrations.length : 0,
                status: e.date < today ? 'Completed' : 'Upcoming'
            }));

            return res.json(eventsWithCounts);
        }

        if (type === 'event_details') {
            const { id } = req.query;
            const event = await Event.findById(id).lean();
            if (!event) return res.status(404).json({ message: 'Event not found' });

            // Get student details for registrations
            const studentIds = event.registrations.map(r => r.studentId).filter(Boolean);
            const students = await User.find({ studentId: { $in: studentIds } }, 'name email studentId department year').lean();

            // Map students back to registrations to include status/timestamp if needed
            const registrationsWithDetails = event.registrations.map(reg => {
                const student = students.find(s => s.studentId === reg.studentId);
                return {
                    ...reg,
                    studentName: student ? student.name : 'Unknown',
                    studentEmail: student ? student.email : 'Unknown',
                    department: student ? student.department : 'Unknown',
                    year: student ? student.year : 'Unknown'
                };
            });

            return res.json({ ...event, registrations: registrationsWithDetails });
        }

        if (type === 'engagement') {
            // Calculate engagement by department
            const allStudents = await User.find({ role: 'student' }, 'department studentId').lean();
            const allEvents = await Event.find({}, 'registrations').lean();

            const activeStudentIds = new Set();
            allEvents.forEach(e => {
                e.registrations.forEach(r => {
                    if (r.studentId) activeStudentIds.add(r.studentId);
                });
            });

            const deptStats = {};

            allStudents.forEach(student => {
                if (!deptStats[student.department]) {
                    deptStats[student.department] = { name: student.department, totalStudents: 0, activeStudents: 0 };
                }
                deptStats[student.department].totalStudents++;
                if (activeStudentIds.has(student.studentId)) {
                    deptStats[student.department].activeStudents++;
                }
            });

            const engagementByDept = Object.values(deptStats).map(d => ({
                ...d,
                rate: d.totalStudents > 0 ? Math.round((d.activeStudents / d.totalStudents) * 100) : 0
            })).sort((a, b) => b.rate - a.rate);

            return res.json(engagementByDept);
        }

        res.status(400).json({ message: 'Invalid type parameter' });

    } catch (error) {
        console.error('Error fetching stat details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// --- User Management Routes ---

// Get All Users (with optional filters)
router.get('/users', async (req, res) => {
    try {
        const { search, role, status } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { studentId: { $regex: search, $options: 'i' } },
                { facultyId: { $regex: search, $options: 'i' } }
            ];
        }

        if (role && role !== 'All') {
            query.role = role.toLowerCase();
        } else {
            // Default: Exclude admins from the general list
            query.role = { $ne: 'admin' };
        }

        if (status && status !== 'All') {
            query.status = status;
        }

        const users = await User.find(query).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update User Status
router.put('/users/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Active', 'Blocked', 'Pending'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete User
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
