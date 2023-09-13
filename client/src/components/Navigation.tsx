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
      <div className="flex justify-center space-x-20">
        <NavLink to="/">auth</NavLink> {/* This will be replaced by a "login" button that will display only when the user is not logged in - logic pending */}
        <NavLink to="/languages">languages</NavLink>
        <NavLink to="/discover">discover</NavLink>
        <NavLink to="/contribute">contribute</NavLink>
      </div>
    </div>
  );
};

export default Navigation;
