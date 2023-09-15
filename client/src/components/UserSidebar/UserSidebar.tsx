import React, { useState, useContext } from 'react';
import { UserType } from '../../functionality/types';
import SidebarContent from './SidebarContent';
import ToggleIcon from './ToggleIcon';
import { UserContext } from '../../functionality/UserContext'

interface UserSidebarProps {
  user: UserType | null;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { logout } = useContext(UserContext);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // logout(); // Call the logout function from your context

    // After handling logout, close the sidebar
    togglePopup(); // This will set `isOpen` to `false`.
  };

  return (
    <div className="relative">
      <ToggleIcon user={user} onTogglePopup={togglePopup} />
      <SidebarContent user={user} isOpen={isOpen} onClose={togglePopup} onLogout={handleLogout} />
    </div>
  );
};

export default UserSidebar;
