import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../functionality/UserContext';

interface HeaderProps {
    // Define any props being passed to Header component
}

const Header: React.FC = () => {
  const { user } = useContext(UserContext) || { user: null };

  return (

    <header className="bg-gray-200 absolute top-0 left-0 right-0 p-4 items-end">
      <div className="text-black flex justify-end"> 
        <Link to={user ? '/home' : '/'} className="hover:text-blue-500">
          <div className='flex items-center text-gray-500'>
            Snippets 	&lt;            
            <img alt='logo' className='w-10' src='/snippets_logo_small.png' />
            /	&gt;
            </div>
        </Link>
    </div>
  </header>
  )
}


export default Header;