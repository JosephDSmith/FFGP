import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../../functionality/types';

interface SidebarContentProps {
  user: UserType | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void; // Add a callback for logging out
}

const SidebarContent: React.FC<SidebarContentProps> = ({ user, isOpen, onClose, onLogout }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate(); // Initialize useHistory

  const handleSettingsClick = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const handleLogoutClick = () => {
    // Clear user data and navigate to the home page
    onLogout();
    nav('/');
  };

  const handleSidebarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="navbar-container relative">
      <div
        ref={sidebarRef}
        className={`fixed top-0 ${isOpen ? 'left-0' : '-left-1/8'} h-full w-1/8 bg-white border rounded-2xl-lg shadow-lg transition-transform duration-300 ease-in-out p-3.5`}
        onClick={handleSidebarClick}
        style={{ display: isOpen ? 'block' : 'none' }}
      >

        {/* Close button */}
        <button
          className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"
          onClick={() => onClose()}
        >
          <img
            src="https://t.ly/4W6ob"
            alt="Close Button"
            className="w-3 h-3  mb-2"
          />
        </button>

        {/* User details */}
        <div className="flex flex-col items-center p-4">
          <img
            src={user?.picture || 'https://t.ly/JM6x_'}
            alt="User Profile"
            className="w-16 h-16 rounded-full mb-2"
          />
          <div className="text-lg font-semibold">{user?.email || 'User Email'}</div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 bg-gray-200 p-1 flex-1 text-left rounded-xl">contributions:</div>
            <div className="text-sm text-gray-500 bg-gray-200 p-1 flex-1 text-right rounded-xl">10010</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex mt-2 flex-col">
          <button className="py-2 px-4 my-1 text-white bg-gray-500 rounded-xl">
            View Contributions
          </button>
          <button className="py-2 px-4 my-1 text-white bg-gray-500 rounded-xl" onClick={handleSettingsClick}>
            Settings
          </button>
          {showDeleteButton && (
            <button className="py-2 px-4 my-1 text-white bg-red-500 rounded-xl">
              DELETE ACCOUNT
            </button>
          )}
        </div>

        {/* Logout button (inside the sidebar) */}
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <button className="py-2 px-4 my-1 text-white bg-red-500 rounded-xl" style={{ bottom: '10%' }} onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
