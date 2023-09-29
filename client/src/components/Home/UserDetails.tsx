import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../functionality/UserContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
          let userContributions = 0; // Initialize the count of user contributions
  
          data.forEach((snippet: any) => {
            if (snippet.user_id === user.id && snippet.tags) {
              userContributions++; // Increment the count for each user contribution
  
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

  // Animation variants for slide-in effect
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="user-details p-24 text-center m-w-m"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <img
        src={user?.picture || 'https://t.ly/JM6x_'}
        alt="User Profile"
        className="mx-auto w-24 h-24 rounded-full mb-2" 
      />
      <div className="text-lg font-semibold">
        {user?.email || 'User Email'}
      </div>

      {/* display user contribution count */}
      <motion.div
        className="flex justify-between max-w-sm m-auto gap-2"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-sm text-slate-500 bg-gray-200 p-1 flex-1 text-left rounded-xl">
          Contributions:
        </div>
        <div className="text-sm text-slate-500 bg-gray-200 p-1 flex-1 text-right rounded-xl max-w-sm">
          {user?.snippet_count}
        </div>
      </motion.div>
      {/* display top language contributions count */}
      <motion.div
        className="top-languages pt-4"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="mb-2">Top Languages:</h2>
        {topLanguages.map(({ id, language, count }) => (
          <motion.div
            key={id}
            className="max-w-sm m-auto mb-2"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to={`/discover/${id}`}>
              <div className="text-sm text-gray-500 bg-gray-200 p-1 flex justify-between rounded-xl">
                <div className="mr-2">{language}</div>
                <div className="ml-5">{count}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default UserDetails;