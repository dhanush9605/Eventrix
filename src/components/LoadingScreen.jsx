import React from 'react';

const LoadingScreen = ({ message = "Loading System..." }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        color: '#ffffff',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        eventri<span style={{
          color: '#d32f2f',
          textShadow: '0 0 20px rgba(211, 47, 47, 0.6)',
          animation: 'pulse 2s infinite'
        }}>x</span>
      </div>
      
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          borderTopColor: '#d32f2f',
          animation: 'spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: 'calc(100% - 20px)',
          height: 'calc(100% - 20px)',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          borderBottomColor: '#ffffff',
          animation: 'spinReverse 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
        }}></div>
      </div>
      
      <div style={{
        marginTop: '2rem',
        color: '#a0a0a0',
        fontSize: '0.9rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        animation: 'pulse 2s infinite'
      }}>
        {message}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spinReverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
