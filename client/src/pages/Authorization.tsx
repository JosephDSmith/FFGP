import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../functionality/UserContext';
import AuthCard from '../components/Authorization/AuthCard';

const PROGRAMMERCOLLAB = "https://i.ibb.co/3T3xGQ4/Programmers-Collaborating.png";

const Authorization = () => {
  const nav = useNavigate();
  const [popup, setPopup] = useState<Window | null>(null);
  const { user, setUser, login } = useContext(UserContext)!;

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = 'Login with Google';
    const url = '/google';
    window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
    setPopup(popup);
  };

  useEffect(() => {
    // Add the message listener
    const messageEventListener = (event: MessageEvent) => {
      if (event.data.url && event.data.url.match('/google/auth')) {
        login();
        nav('/home');
      }
    };

    window.addEventListener('message', messageEventListener);

    return () => {
      window.removeEventListener('message', messageEventListener);
    };
  }, []);

  // Clears popup once user logs in
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
    <div className="authorization flex flex-col items-center justify-center mt-16">
      <img src="https://i.ibb.co/WKs7pwz/programmershomepage.png" alt="programmers collaborating"/>
      <div className="mt-4">
        <AuthCard onGoogleLogin={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default Authorization;