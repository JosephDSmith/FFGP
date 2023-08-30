import React from 'react';
import './Home.css'; 

interface HomeProps {
  // Define any props being passed to Home component
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className="home">
      {/* Home content goes here */}
      <h1>THIS IS HOME </h1>
    </div>
  );
};

export default Home;