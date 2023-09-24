import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../functionality/UserContext';
import AuthCard from '../components/Authorization/AuthCard';
import HalfCircle from '../components/Authorization/HalfCircle';

const Authorization = () => {
  const nav = useNavigate();
  const [popup, setPopup] = useState<Window | null>(null);
  const { user, setUser } = useContext(UserContext)!;

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = 'Login with Google';
    const url = '/google';

    // Open the popup window for Google OAuth
    const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
    setPopup(popup);
  };

  useEffect(() => {
    // Add the message listener
    const messageEventListener = (event: MessageEvent) => {
      if (event.data.user) {
        // Update the user data in your UserContext
        setUser(event.data.user);
        // Redirect the user after authentication
        nav('/home');
      }
    };

    window.addEventListener('message', messageEventListener);

    return () => {
      window.removeEventListener('message', messageEventListener);
    };
  }, [setUser, nav]);

  // Clears popup once the user logs in
  useEffect(() => {
    const popupCloseListener = () => {
      setPopup(null);
    };

    if (popup) {
      popup.addEventListener('beforeunload', popupCloseListener);
    }

    return () => {
      if (popup) {
        popup.removeEventListener('beforeunload', popupCloseListener);
      }
    };
  }, [popup]);

  return (
    <div className="authorization flex">
      <HalfCircle />
      <div className="flex-1 flex justify-center items-center" style={{ marginLeft: '700px', marginTop: '100px' }}>
        <AuthCard onGoogleLogin={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default Authorization;
