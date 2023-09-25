import React, { useState } from 'react';
import { UserType } from '../../functionality/types';
import SidebarContent from './SidebarContent';
import ToggleIcon from './ToggleIcon';

interface UserSidebarProps {
  user: UserType | null;
  logout: () => void
}

const UserSidebar: React.FC<UserSidebarProps> = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(user)

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    fetch("/clear")
    .then(r => {
      if(r.ok){
        logout();
        togglePopup(); 

      }})
    

  };

  return (
    <div className="relative">
      <ToggleIcon user={user} onTogglePopup={togglePopup} />
      <SidebarContent user={user} isOpen={isOpen} onClose={togglePopup} onLogout={handleLogout} />
    </div>
  );
};

export default UserSidebar;
