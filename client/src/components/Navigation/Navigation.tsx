import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; 

interface NavigationProps {
  // Define any props being passed to Navigation component
}

const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <div className="navigation">
      {/* Navigation content goes here */}
      <h1>THIS IS NAVIGATION </h1>
        <Link to="/">auth</Link><br/>
        <Link to="/home">home</Link><br/>
        <Link to="/languages">languages</Link><br/>
        <Link to="/settings">settings</Link><br/>
    </div>
  );
};

export default Navigation;