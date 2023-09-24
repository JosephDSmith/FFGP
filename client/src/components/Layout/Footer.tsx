import React from 'react';
import Navigation from './Navigation';

const Footer: React.FC = () => {
  return (
    <header className="fixed bottom-0 left-0 w-full pl-4 pr-4 bg-white z-51">
      <div className="border-t-2 border-solid border-black"></div>
      <Navigation />
    </header>
  );
};

export default Footer;
