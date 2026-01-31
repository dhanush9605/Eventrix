import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const HelpCenter = () => {
    const { user } = useAuth();
    const role = user?.role || 'student';
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            q: "How do I register for an event?",
            a: "Navigate to the 'Events' tab in your dashboard. Browse through the available events and click 'Register Now' on the event you want to attend."
        },
        {
            q: "Where can I find my certificates?",
            a: "All your earned certificates are stored in the 'Certificates' section. You can view them anytime and download them as PDF files."
        },
        {
            q: "How do I change my password?",
            a: "Go to Settings > Security. There you can enter your current password and set a new one."
        },
        {
            q: "Who do I contact for technical issues?",
            a: "You can use the form below to send a message directly to our support team, or email support@eventrix.edu."
        }
    ];

    return (
        <DashboardLayout role={role} title="Help Center">
            <div style={{ maxWidth: '800px' }}>
                {/* Search Header */}
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: '#0a0505',
                    border: '1px solid #1a1a1a',
                    borderRadius: '12px',
                    marginBottom: '3rem'
                }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>How can we help you?</h2>
                    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
                        <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={20} />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            style={{
                                width: '100%',
                                padding: '16px 1rem 16px 3rem',
                                backgroundColor: '#111',
                                border: '1px solid #222',
                                borderRadius: '100px',
                                color: '#fff',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Frequently Asked Questions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, index) => (
                            <div key={index} style={{
                                backgroundColor: '#0a0505',
                                border: '1px solid #1a1a1a',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1.5rem',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        textAlign: 'left'
                                    }}
                                >
                                    {faq.q}
                                    {openFaq === index ? <ChevronUp size={20} color="#d32f2f" /> : <ChevronDown size={20} color="#666" />}
                                </button>
                                {openFaq === index && (
                                    <div style={{ padding: '0 1.5rem 1.5rem', color: '#888', lineHeight: '1.6' }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>



            </div>
        </DashboardLayout>
    );
};

export default HelpCenter;
