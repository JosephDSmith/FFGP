import React, { useState } from 'react';
import { UserType } from '../../functionality/types';
import SidebarContent from './SidebarContent';
import ToggleIcon from './ToggleIcon';

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
    togglePopup(); 
  };

  return (
    <div className="relative">
      <ToggleIcon user={user} onTogglePopup={togglePopup} />
      <SidebarContent user={user} isOpen={isOpen} onClose={togglePopup} onLogout={handleLogout} />
    </div>
  );
};

export default UserSidebar;
