import React, { useEffect, useState } from 'react';
import { TagType } from '../functionality/types';
import { useNavigate } from 'react-router-dom';

interface LanguagesProps {}

const Languages: React.FC<LanguagesProps> = () => {
  const nav = useNavigate();
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    fetch('/api/tags')
      .then((r) => r.json())
      .then((d) => setTags(d));
  }, []);

  return (
    <div className="languages">

      {/* Section 1: Introduction */}
      <div className="bg-gray-100 py-16 p-4">
        <div className="mx-auto text-center max-w-2xl">
          <p className="pt-4 text-base text-slate-500">
            We've gathered an extensive list of programming languages to cater to developers, learners,
            and enthusiasts of all levels. Whether you're a beginner eager to start or a seasoned coder
            looking to expand your skills, you'll find a language that suits your needs.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => nav('/discover')}
              className="text-lg rounded-full px-6 py-3 bg-green-200 hover:bg-green-300 text-slate-800 transition-colors duration-300"
            >
              Discover Now
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Tags */}
      <div className="bg-white py-16 p-4 pb-32">
        <div className="mx-auto text-center max-w-2xl">
          <h2 className="text-3xl text-slate-500">Dive Deeper into Specific Languages</h2>
          <p className="mt-4 text-base text-slate-500">
            Ready to dive deeper into a specific language? Click on any tag to access a wealth of resources! Our platform is designed to help
            you master your chosen subject and succeed in your coding endeavors.
          </p>
          <div className='flex flex-wrap justify-center items-center mt-8'>
            {tags.map(t => (
              <button
                key={t.id}
                className="mx-4 my-2 w-48 rounded-full px-4 py-3 bg-blue-400 hover:bg-blue-600 text-white transition-colors duration-300"
                onClick={() => nav('/discover/' + t.id)}
              >
                {t.name} ({t.snippets?.length})
              </button>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Languages;