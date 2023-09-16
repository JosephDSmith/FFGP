import React, { useEffect, useState } from 'react';
import { TagType } from '../functionality/types';
import { useNavigate } from 'react-router-dom';

interface LanguagesProps {
  // Define any props being passed to Languages component
}

const Languages: React.FC<LanguagesProps> = (props) => {

  const nav = useNavigate();

  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    fetch('/api/tags')
      .then(r => r.json())
      .then(d => setTags(d))

  }, [])

  return (
    <div className="languages">

      <div >
        <div className="mx-auto pb-10 max-w-2xl">
          <p className="mt-2 text-slate-500">We've gathered an extensive list of programming languages to cater to developers, learners,
            and enthusiasts of all levels. Whether you're a beginner eager to start or a seasoned coder
            looking to expand your skills, you'll find a language that suits your needs.</p>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => nav('/discover')}
              className="text-lg rounded-full px-8 py-5 bg-white hover:bg-gray-400"
            >Discover
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white py-30 ">
        <div className="py-10 mx-auto  max-w-2xl ">
          <p className="mt-2 text-slate-500">Ready to dive deeper into a specific language?
            Click on any tag to access a wealth of resources! Our platform is designed to help
            you master your chosen subject and succeed in your coding endeavors</p>
        </div>
        <div className='flex flex-wrap justify-center items-center  max-w-8xl mx-auto pb-10'>
          {tags.map(t => (
            <button
              key={t.id}
              className="mx-6 my-1 w-48 rounded-full px-5 py-4 bg-blue-200 hover:bg-blue-400"
              onClick={() => nav('/discover/' + t.id)}
            >
              {t.name} ({t.snippets.length})
            </button>
          ))}
        </div>
      </div>

      <div >
        <div className="py-8 mx-auto  max-w-2xl">
          <p className="mt-2 text-slate-500">Help us enrich our language library! 
          Your contributions are valuable in expanding our offerings and supporting 
          the coding community. Contribute today and be part of the driving force behind 
          our ever-growing collection</p>
        
        </div>
      </div>
    </div>
  );
};

export default Languages;