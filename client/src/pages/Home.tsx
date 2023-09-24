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
    </div>
  );
};

export default Home;