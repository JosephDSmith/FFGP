import React, { FC } from 'react';
import WelcomeMessage from './WelcomeMessage';
import Button from './Button';
import Image from './Image';

interface AuthCardProps {
  onGoogleLogin: () => void;
}

const AuthCard: FC<AuthCardProps> = ({ onGoogleLogin }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md text-center">
      <WelcomeMessage />
      <Button onClick={onGoogleLogin}>
        <Image
          src="https://i.ibb.co/615VxNj/google-logo.png"
          alt="Google Logo"
        />
        Login with Google
      </Button>
    </div>
  );
};

export default AuthCard;