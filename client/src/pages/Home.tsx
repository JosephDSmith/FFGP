import React, { useEffect, useState, useContext } from 'react';
import { SnippetType } from '../functionality/types';
import CounterHeader from '../components/Home/CounterHeader';
import UserDetails from '../components/Home/UserDetails';
import ContributeBlurb from '../components/Home/ContributeBlurb';
import TagsDiscovery from '../components/Home/TagsDiscovery';
import {UserContext} from '../functionality/UserContext'; 

interface HomeProps {
  // Define any props being passed to Home component
}

const Home: React.FC<HomeProps> = (props) => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const {user} = useContext(UserContext)|| { user: null };

  useEffect( () => {
    fetch('/api/snippets')
      .then(r => r.json())
      .then(d => {
        setSnippets(d)
      })
  },[])

  return (

    <div className="home">
      

      <ContributeBlurb />
      <TagsDiscovery />
      <CounterHeader count={snippets.length} />
      {user && <UserDetails />}
    </div>
  );
};

export default Home;