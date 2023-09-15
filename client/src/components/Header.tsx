import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    // Define any props being passed to Header component
}

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200 absolute top-0 left-0 right-0 p-4">
      <div className="container mx-auto">
        <h1 className="text-xl text-black text-right">
          <Link to="/" className="hover:text-blue-500">
            [APP LOGO]
          </Link>
        </h1>
      </div>
    </header>
  )
}

export default Header;