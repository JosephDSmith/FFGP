import { FC } from 'react';

const HalfCircle: FC = () => {
  return (
    <div className="half-circle absolute top-0 left-0 w-1/2 h-screen bg-gray-400 text-white overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to [Your Snippets]</h1>
        <p className="text-sm">An online community of educational bits</p>
        <br />
        <br />
        <p className="text-lg">Join today!</p>
      </div>
    </div>
  );
};

export default HalfCircle;