import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../functionality/UserContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface UserDetailsProps {}

const UserDetails: React.FC<UserDetailsProps> = () => {
  const { user } = useContext(UserContext) || { user: null };
  const [topLanguages, setTopLanguages] = useState<{ id: number; language: string; count: number }[]>([]);

  useEffect(() => {
    if (user) {
      fetch('/api/snippets')
        .then((r) => r.json())
        .then((data) => {
          // Count occurrences of each tag's name
          const tagCounts: Record<string, { id: number; count: number }> = {};
          data.forEach((snippet: any) => {
            if (snippet.user_id === user.id && snippet.tags) {
              snippet.tags.forEach((tag: any) => {
                const tagName = tag.name;
                if (tagName in tagCounts) {
                  tagCounts[tagName].count++;
                } else {
                  tagCounts[tagName] = { id: tag.id, count: 1 };
                }
              });
            }
          });

          // Convert tagCounts object into an array of objects
          const languagesArray = Object.entries(tagCounts).map(([language, { id, count }]) => ({
            id,
            language,
            count,
          }));

          // Sort the languages by count in descending order
          languagesArray.sort((a, b) => b.count - a.count);

          // Get the top 3 languages
          const top3Languages = languagesArray.slice(0, 3);

          setTopLanguages(top3Languages);
        })
        .catch((error) => {
          console.error('Error fetching snippets:', error);
        });
    }
  }, [user]);

  console.log(user)

  

  return (
    <div className="user-details p-24 text-center bg-white m-w-m">
      <img
        src={user?.picture || 'https://t.ly/JM6x_'}
        alt="User Profile"
        className="mx-auto w-24 h-24 rounded-full mb-2" 
      />
      <div className="text-lg font-semibold">
        {user?.email || 'User Email'}
      </div>
      <div className="flex justify-between max-w-sm m-auto gap-2">
        <div className="text-sm text-gray-500 bg-gray-200 p-1 flex-1 text-left rounded-xl">
          Contributions:
        </div>
        <div className="text-sm text-gray-500 bg-gray-200 p-1 flex-1 text-right rounded-xl max-w-sm">
          10010
        </div>
      </div>
      <div className="top-languages pt-4">
        <h2>Top Languages:</h2>
        <ul className="flex justify-center items-center flex-wrap">
          {topLanguages.map(({ id, language, count }) => (
            <Link to={`/discover/${id}`} key={id}>
              <li className="bg-gray-400 p-2 m-1 rounded-full text-center text-white w-48">
                {language}: {count}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
