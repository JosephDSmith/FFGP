import React from 'react';
import './Authorization.css'; 

interface AuthorizationProps {
    // Define any props being passed to Authorization component
}

const Authorization: React.FC<AuthorizationProps> = (props) => {
  return (
    <div className="authorization">
      {/* Authorization content goes here */}
      <h1>THIS IS AUTH </h1>
    </div>
  );
};

export default Authorization;