import React, { FC } from 'react';
import WelcomeMessage from './WelcomeMessage';
import Button from './Button';
import Image from './Image';

interface AuthCardProps {
  onGoogleLogin: () => void;
}

const AuthCard: FC<AuthCardProps> = ({ onGoogleLogin }) => {
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="rounded-lg shadow-md p-10 w-full max-w-md text-center relative z-30 bg-white ">
        <WelcomeMessage />
        <Button onClick={onGoogleLogin}>
          <Image
            src="/assets/logo/google-logo.png"
            alt="Google Logo"
          />
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default AuthCard;