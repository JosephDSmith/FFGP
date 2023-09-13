import React, {useEffect, useState} from 'react';
import {TagType} from '../functionality/types';

interface LanguagesProps {
  // Define any props being passed to Languages component
}

const Languages: React.FC<LanguagesProps> = (props) => {

  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    fetch('/api/tags')
    .then(r => r.json())
    .then(d => setTags(d))

  },[])
  
  return (
    <div className="languages">
      {/* Languages content goes here */}
      <h1>THIS IS LANGUAGES </h1>
      There are {tags.length} total tags 
      {tags.map(t => (<div>{t.name}: {t.snippets.length} snippets</div>))}
    </div>
  );
};

export default Languages;