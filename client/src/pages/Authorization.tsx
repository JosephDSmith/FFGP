import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/Authorization/AuthCard';
import HalfCircle from '../components/Authorization/HalfCircle';

const Authorization = () => {
  const nav = useNavigate();

  const handleGoogleLogin = () => {
    // Perform the Google OAuth login logic here
    // After successful login, navigate to the home page
    nav('/home');
  };

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