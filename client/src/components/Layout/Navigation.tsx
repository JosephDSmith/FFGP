// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  // Define any props being passed to Navigation component
}

// created a component to host styling of each link for readability
const NavLink: React.FC<{ to: string; children: string }> = ({ to, children }) => (
  <Link
    to={to}
    className="text-black text-l hover:text-blue-500 transition-colors duration-300"
  >
    {children}
  </Link>
);

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div className="navigation text-center">
      <div className="flex justify-center">
        <div className="sm:hidden space-x-20">
          <NavLink to="/">❤️</NavLink>
          <NavLink to="/languages">❤️</NavLink>
          <NavLink to="/discover">❤️</NavLink>
          <NavLink to="/contribute">❤️</NavLink>
        </div>
        <div className="hidden sm:flex space-x-20">
          <NavLink to="/languages">languages</NavLink>
          <NavLink to="/discover">discover</NavLink>
          <NavLink to="/contribute">contribute</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
