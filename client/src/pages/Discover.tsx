import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { SnippetType } from '../functionality/types';

const Discover: React.FC = () => {

  const {tagId} = useParams();
  console.log(tagId);

  return (
    <div className="discover">
      <h1>DISOVER HERE</h1>
      {tagId ? ( <div>Tag: {tagId} </div>) :  null}
    </div>
  )
}

export default Discover