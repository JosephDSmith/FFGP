import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../functionality/UserContext';

interface HeaderProps {
    // Define any props being passed to Header component
}

const Header: React.FC = () => {
  const { user } = useContext(UserContext) || { user: null };

  return (

    <header className="absolute top-0 left-0 right-0 py-4 items-end">
      <div className="text-black flex justify-end"> 
        <Link to={user ? '/home' : '/'} className="hover:text-blue-500">
          <div className='flex items-center text-black mr-5'>
          CodeWhisker         
            <img alt='logo' className='w-10' src='/assets/logo/snippets_logo_small.png' />
            </div>
        </Link>
    </div>
  </header>
  )
}


export default Header;