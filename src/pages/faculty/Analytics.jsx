import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { Star, TrendingUp, TrendingDown, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const waveData = [
    { name: 'SEP', reg: 400, att: 240 },
    { name: 'OCT', reg: 300, att: 139 },
    { name: 'NOV', reg: 800, att: 580 },
    { name: 'DEC', reg: 278, att: 190 },
    { name: 'JAN', reg: 989, att: 890 },
    { name: 'FEB', reg: 390, att: 200 },
];

const categoryData = [
    { name: 'TECH', value: 400 },
    { name: 'SEMINAR', value: 300 },
    { name: 'CULTURAL', value: 600, active: true },
    { name: 'SPORTS', value: 200 },
    { name: 'WORKSHOPS', value: 278 },
];

const FacultyAnalytics = () => {
    return (
        <DashboardLayout role="faculty" title="Faculty Analytics Dashboard">
            {/* Top Banner section */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Engagement Metrics</h2>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>Key performance indicators for the current semester.</p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '-2rem', justifyContent: 'flex-end' }}>
                    <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>Last 30 Days</button>
                    <button style={{ color: '#666', padding: '8px 16px', fontSize: '0.75rem', fontWeight: 'bold', border: 'none', background: 'none' }}>Custom Range</button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <MetricCard title="TOTAL REGISTRATIONS" value="18,492" trend="+12%" subtext="Since last academic period" trendUp />
                <MetricCard title="AVG. ATTENDANCE RATE" value="91.2%" trend="+4.3%" progress={91.2} trendUp />
                <MetricCard title="FEEDBACK SCORE" value="4.85/5" trend="0%" stars={5} />
                <MetricCard title="ACTIVE ORGANIZERS" value="124" trend="-2%" trendDown />
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', marginBottom: '3rem' }}>
                {/* Registration vs Attendance Chart */}
                <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Registration vs Attendance</h3>
                            <p style={{ color: '#444', fontSize: '0.75rem' }}>Volume comparison across event timeline</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.65rem', fontWeight: 'bold' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff' }}></span> REG.</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d32f2f' }}></span> ATT.</span>
                        </div>
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={waveData}>
                                <defs>
                                    <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} dy={10} />
                                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #222' }} />
                                <Area type="monotone" dataKey="reg" stroke="#fff" strokeWidth={3} fillOpacity={1} fill="url(#colorReg)" />
                                <Area type="monotone" dataKey="att" stroke="#d32f2f" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Participation by Category */}
                <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Participation by Category</h3>
                            <p style={{ color: '#444', fontSize: '0.75rem' }}>Engagement volume per department</p>
                        </div>
                        <MoreHorizontal size={18} color="#444" />
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 9 }} dy={10} />
                                <Tooltip />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.active ? '#d32f2f' : '#111'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Completed Events Table */}
            <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Completed Events Summary</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '6px 16px', borderRadius: '6px', fontSize: '0.7rem' }}>RECENT</button>
                        <button style={{ color: '#444', padding: '6px 16px', fontSize: '0.7rem', border: 'none', background: 'none' }}>TOP PERFORMING</button>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ color: '#444', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111' }}>
                            <th style={{ padding: '1rem 2rem' }}>Event Detail</th>
                            <th style={{ padding: '1rem' }}>Category</th>
                            <th style={{ padding: '1rem' }}>Registrations</th>
                            <th style={{ padding: '1rem' }}>Attendance</th>
                            <th style={{ padding: '1rem' }}>Score</th>
                            <th style={{ padding: '1rem 2rem' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <EventTableRow
                            title="International Hackathon 2024"
                            date="Jan 12 - Jan 14, 2024"
                            category="TECH / EXCELLENCE"
                            regs="1,240"
                            att="1,180 (95.1%)"
                            score="4.9"
                            status="SUCCESSFUL"
                            icon="hackathon"
                        />
                        <EventTableRow
                            title="Annual Cultural Fest (Aura)"
                            date="Dec 20 - Dec 22, 2023"
                            category="ARTS & CULTURE"
                            regs="5,800"
                            att="4,200 (72.4%)"
                            score="4.6"
                            status="ARCHIVED"
                            icon="culture"
                        />
                        <EventTableRow
                            title="Guest Lecture: AI Ethics"
                            date="Feb 05, 2024"
                            category="ACADEMIC"
                            regs="450"
                            att="432 (96.0%)"
                            score="4.9"
                            status="SUCCESSFUL"
                            icon="lecture"
                        />
                    </tbody>
                </table>

                {/* Pagination Footer */}
                <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#666', borderTop: '1px solid #111' }}>
                    <span>Showing <strong style={{ color: '#fff' }}>3</strong> of <strong style={{ color: '#fff' }}>48</strong> completed events</span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#444', padding: '6px', borderRadius: '4px' }}><ChevronLeft size={16} /></button>
                        <button style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>1</button>
                        <button style={{ border: '1px solid #222', background: 'none', color: '#666', padding: '6px 12px', borderRadius: '4px' }}>2</button>
                        <button style={{ border: '1px solid #222', background: 'none', color: '#666', padding: '6px 12px', borderRadius: '4px' }}>3</button>
                        <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#444', padding: '6px', borderRadius: '4px' }}><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const MetricCard = ({ title, value, trend, subtext, progress, stars, trendUp, trendDown }) => (
    <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.5rem 2rem' }}>
        <span style={{ display: 'block', fontSize: '0.65rem', color: '#666', fontWeight: '800', marginBottom: '1rem', letterSpacing: '0.05em' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>{value}</span>
            <span style={{
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: trendUp ? '#00c853' : trendDown ? '#d32f2f' : '#666',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '6px'
            }}>
                {trendUp && <TrendingUp size={12} />}
                {trendDown && <TrendingDown size={12} />}
                {trend}
            </span>
        </div>
        {subtext && <p style={{ fontSize: '0.65rem', color: '#444', fontStyle: 'italic' }}>{subtext}</p>}
        {progress && (
            <div style={{ width: '100%', height: '4px', backgroundColor: '#111', borderRadius: '2px', marginTop: '1.5rem' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#d32f2f', borderRadius: '2px' }}></div>
            </div>
        )}
        {stars && (
            <div style={{ display: 'flex', gap: '4px', marginTop: '1rem' }}>
                {[...Array(stars)].map((_, i) => <Star key={i} size={12} fill="#d32f2f" stroke="#d32f2f" />)}
            </div>
        )}
    </div>
);

const EventTableRow = ({ title, date, category, regs, att, score, status, icon }) => (
    <tr style={{ borderBottom: '1px solid #050505', color: '#fff', fontSize: '0.85rem' }}>
        <td style={{ padding: '1.5rem 2rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#111', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d32f2f' }}>
                    {icon === 'hackathon' && '👨‍💻'}
                    {icon === 'culture' && '🎭'}
                    {icon === 'lecture' && '🎓'}
                </div>
                <div>
                    <span style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>{title}</span>
                    <span style={{ fontSize: '0.7rem', color: '#666' }}>{date}</span>
                </div>
            </div>
        </td>
        <td style={{ padding: '1rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 'bold', border: '1px solid #333', padding: '2px 8px', borderRadius: '4px', color: '#888' }}>{category}</span>
        </td>
        <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.95rem' }}>{regs}</td>
        <td style={{ padding: '1rem' }}>
            <span style={{ display: 'block', fontWeight: 'bold' }}>{att.split(' ')[0]}</span>
            <span style={{ fontSize: '0.7rem', color: '#00c853', fontWeight: 'bold' }}>{att.split(' ')[1]}</span>
        </td>
        <td style={{ padding: '1rem', fontWeight: 'bold', color: '#d32f2f' }}>{score}</td>
        <td style={{ padding: '1rem 2rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: '900', color: status === 'SUCCESSFUL' ? '#00c853' : '#444', border: '1px solid', borderColor: status === 'SUCCESSFUL' ? '#00c85330' : '#44430', padding: '4px 10px', borderRadius: '4px' }}>
                {status}
            </span>
        </td>
    </tr>
);

export default FacultyAnalytics;
