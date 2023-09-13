import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';

interface HeaderProps {
    // Define any props being passed to Header component
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="header">
      {/* Header content goes here */}
      <h1 className="text-3xl font-bold underline">THIS IS HEADER </h1>
      <Navigation />
    </header>
  );
};

export default Header;