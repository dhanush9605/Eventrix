import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#000000', borderTop: '1px solid #111', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                            <div style={{ width: '24px', height: '24px', backgroundColor: '#d32f2f', borderRadius: '3px' }}></div>
                            <span style={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>EVENTRI<span style={{ color: '#d32f2f' }}>X</span></span>
                        </div>
                        <p style={{ color: '#444', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            © 2024 EVENTRIX SYSTEMS. ALL RIGHTS RESERVED.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '2.5rem' }}>
                        <Link to="/login" style={{ color: '#666', textDecoration: 'none', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Privacy</Link>
                        <Link to="/login" style={{ color: '#666', textDecoration: 'none', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Terms</Link>
                        <Link to="/login" style={{ color: '#666', textDecoration: 'none', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Support</Link>
                        <Link to="/login" style={{ color: '#666', textDecoration: 'none', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Security</Link>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', color: '#666' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
