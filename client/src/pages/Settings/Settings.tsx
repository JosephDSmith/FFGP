import React, { useContext } from 'react';
import './Settings.css'; 
import UserContext from '../../functionality/UserContext';
import { UserContextType } from '../../functionality/types';

interface SettingsProps {
  // Define any props being passed to Settings component
}

const Settings: React.FC<SettingsProps> = (props) => {
  const { user } = useContext(UserContext) as UserContextType;
  // Type assertion ---------------^

  console.log(user);

  return (
    <div className="settings">
      {/* Display user data */}
      {user ? (
        <div>
          <h1>Welcome to Settings, {user.email}!</h1>
          <img alt='profile pic' src={user.picture} />
          {/* Other settings content goes here */}
        </div>
      ) : (
        <h1>No user data available</h1>
      )}
    </div>
  );
};

export default Settings;