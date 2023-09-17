import React from 'react';
import { Link } from 'react-router-dom';

interface CounterHeaderProps {

}

const ContributeBlurb: React.FC<CounterHeaderProps> = () => {
  return (
    <div className="text-center bg-gray-100 p-20 w-100% ">
      <p className="text-base m-1">
      Are you ready to make a difference? 
      Contribute your own code snippets and help shape our vibrant community. 
      Whether you're a seasoned pro or just starting, your knowledge is valuable. 
      Share your code to inspire, educate, and elevate the learning experience for all.
      </p><br/>
      <div className="m-10 p-4 max-w-sm text-gray-600 bg-white rounded-full flex justify-center items-center">
        <Link to="/contribute">contribute</Link>
      </div>
    </div>
  )
}

export default ContributeBlurb