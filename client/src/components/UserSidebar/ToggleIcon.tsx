import React from 'react';
import { UserType } from '../../functionality/types';

interface ToggleIconProps {
  user: UserType | null;
  onTogglePopup: () => void;
}

const ToggleIcon: React.FC<ToggleIconProps> = ({ user, onTogglePopup }) => {
  return (
    <div className="fixed top-5 left-5 z-10">
      <img
        onClick={onTogglePopup}
        src={user?.picture || 'https://t.ly/JM6x_'}
        alt="User Profile"
        className="w-10 h-10 m-2 rounded-full cursor-pointer"
      />
    </div>
  );
};

export default ToggleIcon;