import React from 'react';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="fixed bottom-0 left-0 w-full bg-gray-200 p-4">
      <Navigation />
    </header>
  );
};

export default Header;