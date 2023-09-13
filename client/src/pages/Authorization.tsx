import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/Authorization/AuthCard';

const Authorization = () => {
  const nav = useNavigate()

  const handleGoogleLogin = () => {
    // Perform the Google OAuth login logic here
    // After successful login, navigate to the home page
    nav('/home')
  };

  return (
    <div className="authorization flex-col justify-center items-end h-screen absolute top-40 right-1/4 pr--20">

        <AuthCard onGoogleLogin={handleGoogleLogin} />

    </div>
  )
}

export default Authorization;