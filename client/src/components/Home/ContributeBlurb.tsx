import React from 'react';
import { Link } from 'react-router-dom';
// import './Arrow.css';

interface ContributeBlurbProps {}

const ContributeBlurb: React.FC<ContributeBlurbProps> = () => {
  return (
    <div className="text-center p-20 px-96 bg-green-50 rounded-lg">
      <div className="p-6 text-left">
        <p className="text-lg font-bold text-slate-600 mb-4">
          Ready to make a difference in the coding world?
        </p>
        <p className="text-base text-slate-500 mb-6">
          Join our vibrant community and contribute your code snippets.
          Whether you're a seasoned pro or just starting, your knowledge is valuable.
          Share your code to inspire, educate, and elevate the learning experience for everyone.
        </p>
        {/* Arrow to contribute */}
        <Link
          to="/contribute"
          className="contribute-link inline-block px-6 py-3 rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="arrow arrow-first animate-bounce mr-2"></div>
        <div className="arrow arrow-second animate-bounce"></div>
      </div>
    </div>
  );
};

export default ContributeBlurb;