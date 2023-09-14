import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/Authorization/AuthCard';
import HalfCircle from '../components/Authorization/HalfCircle';

const Authorization = () => {
  const nav = useNavigate();
  const [popup, setPopup] = useState<Window|null>(null);

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = 'Login with Google';
    const url = '/google'
    window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
    setPopup(popup);
    
  };

  useEffect(() => {
    // Add the message listener
    const messageEventListener = (event:MessageEvent) => {
      console.log(event.data.url);
      if (event.data.url && event.data.url.match('/google/auth')) {        
        nav('/home');
      }
    };

    window.addEventListener('message', messageEventListener);

    return () => {
      window.removeEventListener('message', messageEventListener);
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