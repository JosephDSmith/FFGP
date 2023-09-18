import React from 'react';
import { Link } from 'react-router-dom';
import './Arrow.css'

interface CounterHeaderProps {}

const ContributeBlurb: React.FC<CounterHeaderProps> = () => {
  return (
    <div className="text-center p-20 w-100% max-w-2xl m-auto">
      <p className="text-base m-1">
        Are you ready to make a difference? Contribute your own code snippets
        and help shape our vibrant community. Whether you're a seasoned pro or
        just starting, your knowledge is valuable. Share your code to inspire,
        educate, and elevate the learning experience for all.
      </p>
      <br />
      {/* arrow to contribute */}
      <Link to="/contribute" className="contribute-link hover:text-gray-500 transition-colors duration-300">
        contribute
      </Link>
      <div className="flex justify-center items-center">
        <div className="arrow arrow-first"> </div>
        <div className="arrow arrow-second"></div>
      </div>
    </div>
  );
};

export default ContributeBlurb;
