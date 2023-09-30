import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../functionality/UserContext';

interface ContributeBlurbProps {}

const ContributeBlurb: React.FC<ContributeBlurbProps> = () => {
  const { user } = useContext(UserContext) || { user: null };

  const linkTo = user ? '/contribute' : '/';
  const buttonText = user ? 'Get Started' : 'Log in to Contribute';

  return (
    <div className="flex flex-col md:flex-row bg-gray-100">
      {/* Left side (text) */}
      <div className="my-32 md:w-1/2 p-12 pt-12 sm:pl-16 md:pl-32 lg:pl-48">
        <h2 className="text-3xl text-slate-500">Ready to make a difference in the coding world?</h2>
        <p className="text-base text-gray-600 mb-6 pt-6">
          Join our vibrant community and contribute your code snippets. Whether you're a seasoned pro or just starting, your knowledge is valuable. Share your code to inspire, educate, and elevate the learning experience for everyone.
        </p>
        <Link
          to={linkTo}
          className="contribute-link inline-block px-6 py-3 rounded-full text-gray-800 bg-green-200 hover:bg-green-300 transition-colors duration-300"
        >
          {buttonText}
        </Link>
      </div>

      {/* Right side (image) */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center md:min-h-0 min-h-screen" style={{ backgroundImage: 'url("https://i.ibb.co/JKf0GdS/codelines-white.png")' }}>
      </div>
    </div>
  );
};

export default ContributeBlurb;