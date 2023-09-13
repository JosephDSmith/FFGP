import React, { useEffect, useState } from 'react';
import { SnippetType } from '../functionality/types';

interface HomeProps {
  // Define any props being passed to Home component
}

const Home: React.FC<HomeProps> = (props) => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);

  useEffect(() => {
    fetch('/api/snippets')
      .then(r => r.json())
      .then(d => setSnippets(d))

  }, [])
  return (
    <div className="home">
      {/* Home content goes here */}
      <h1>THIS IS HOME </h1>
      {snippets.map(s => (
        <div className='snippet'>
          <div>
            <b>Text content: </b>
            {s.text_content}
          </div>

          <div>
            <b>Image content: </b>
            <img alt='snippet' src={s.image_content} />
          </div>

          <div>
            <b>Tags: </b>
            {s.tags?.map(t => t.name).join(', ')}
          </div>
        </div>))}
    </div>
  );
};

export default Home;