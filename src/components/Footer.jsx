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
                            <div style={{ width: '24px', height: '24px', backgroundColor: '#d32f2f', borderRadius: '3px' }}></div>
                            <span style={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>EVENTRI<span style={{ color: '#d32f2f' }}>X</span></span>
                        </div>
                        <p style={{ color: '#444', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                            © 2026 EVENTRIX SYSTEMS. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

