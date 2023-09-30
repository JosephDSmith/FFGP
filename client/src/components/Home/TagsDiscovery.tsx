import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TagType } from '../../functionality/types';

interface TagsDiscoveryProps {}

const TagsDiscovery: React.FC<TagsDiscoveryProps> = () => {
  const [randomTags, setRandomTags] = useState<TagType[]>([]);
  const [allTags, setAllTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch all tags from your API
    fetch("/api/tags")
      .then((r) => r.json())
      .then((data) => {
        setAllTags(data);
        const randomIndices = generateRandomIndices(data.length, 3);
        const selectedTags = randomIndices.map((index) => data[index]);
        setRandomTags(selectedTags);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        setLoading(false);
      });
  }, []);

  // Function to generate random unique indices within a range
  function generateRandomIndices(maxRange: number, count: number) {
    const indices: number[] = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * maxRange);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  }

  return (
    <div className="text-center bg-white p-20 w-full text-slate-500">
      <p className="text-base">
      <h2 className="text-3xl text-slate-500 pb-8">Dive into the world of coding and explore new programming languages.</h2>
        Our platform is a hub for not only finding
        solutions but also for broadening your coding horizons.  <br/>Discover exciting languages, techniques, and approaches
        you might not have encountered otherwise. <br />
        <br />
        Click on one of the tags below to find out more!
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4 flex flex-wrap justify-center"> {/* Center the buttons */}
          {randomTags.map((tag, index) => (
            <Link
              key={index}
              to={`/discover/${tag.id}`}
              className="bg-blue-500 hover:bg-blue-700 p-2 m-1 rounded-full text-center text-white hover:text-gray-100 transition-colors duration-300"
              style={{ minWidth: '100px' }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )} <br/> <br/>
    </div>
  );
};

export default TagsDiscovery;