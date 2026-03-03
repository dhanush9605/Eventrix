import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#000000', borderTop: '1px solid #111', padding: '4rem 0' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    textAlign: 'center'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', justifyContent: 'center' }}>
                            <img src="/logo.svg" alt="Eventrix Logo" style={{ width: '160px', height: 'auto' }} />
                        </div>
                        <p style={{ color: '#444', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                            © 2026 EVENTRIX SYSTEMS. ALL RIGHTS RESERVED.
                        </p>
                        <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '1rem', letterSpacing: '0.05em', textAlign: 'center' }}>
                            Designed & Developed by <a href="https://dhanush-rajesh.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#d32f2f', textDecoration: 'none', fontWeight: 'bold', fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive', fontStyle: 'italic', fontSize: '1.4rem', paddingLeft: '4px' }}>DR</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

