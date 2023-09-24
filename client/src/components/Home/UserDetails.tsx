import React, { useContext } from 'react';
import { UserContext } from '../../functionality/UserContext';

interface UserDetailsProps {}

const UserDetails: React.FC<UserDetailsProps> = () => {
  const { user } = useContext(UserContext) || { user: null }

  console.log(user)

  

  return (
    <div className="user-details p-24 text-center bg-white m-w-m">
      <img
        src={user?.picture || 'https://t.ly/JM6x_'}
        alt="User Profile"
        className="mx-auto w-24 h-24 rounded-full mb-2" // Adjust the w-24 and h-24 for size
      />
      <div className="text-lg font-semibold">
        {user?.email || 'User Email'}
        </div>
      <div className="flex justify-between max-w-sm m-auto gap-2">
        <div className="text-sm text-gray-500 bg-gray-200 p-1 flex-1 text-left rounded-xl ">
          contributions:
        </div>
        <div className="text-sm text-gray-500 bg-gray-200 p-1 flex-1 text-right rounded-xl max-w-sm">
          10010
        </div>
      </div>
      <div className="top-languages pt-4">
        
        <h2>Top Languages:</h2>
        <ul>
          {/* {sortedLanguages.map(([language, count]) => (
            <li key={language}>
              {language}: {count}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;