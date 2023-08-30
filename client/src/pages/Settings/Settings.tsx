import React from 'react';
import './Settings.css'; 

interface SettingsProps {
  // Define any props being passed to Settings component
}

const Settings: React.FC<SettingsProps> = (props) => {
  return (
    <div className="settings">
      {/* Settings content goes here */}
      <h1>TEST - THIS IS SETTINGS </h1>
    </div>
  );
};

export default Settings;