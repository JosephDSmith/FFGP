import React from 'react';
import './Languages.css'; 

interface LanguagesProps {
  // Define any props being passed to Languages component
}

const Languages: React.FC<LanguagesProps> = (props) => {
  return (
    <div className="languages">
      {/* Languages content goes here */}
      <h1>TEST - THIS IS LANGUAGES </h1>
    </div>
  );
};

export default Languages;