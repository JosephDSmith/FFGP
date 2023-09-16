import React, { useEffect, useState } from 'react';
import { SnippetType } from '../functionality/types';
import CounterHeader from '../components/Home/CounterHeader';
import UserDetails from '../components/Home/UserDetails';
import ContributeBlurb from '../components/Home/ContributeBlurb';
import TagsDiscovery from '../components/Home/TagsDiscovery';

interface HomeProps {
  // Define any props being passed to Home component
}

const Home: React.FC<HomeProps> = (props) => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);

  useEffect( () => {
    fetch('/api/snippets')
      .then(r => r.json())
      .then(d => {
        setSnippets(d)
      })
  },[])

  return (

    <div className="home">
      <CounterHeader count={snippets.length} />
      <UserDetails />
      <ContributeBlurb />
      <TagsDiscovery />
      {/* Home content goes here */}
      {/* {snippets.map(s => (
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
        </div>))} */}

    </div>
  );
};

export default Home;