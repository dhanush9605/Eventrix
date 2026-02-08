import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';

// REPLACE THIS WITH YOUR ACTUAL GOOGLE CLIENT ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <EventProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </EventProvider>
    </AuthProvider>
  </StrictMode>,
);
