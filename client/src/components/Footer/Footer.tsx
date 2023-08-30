import React from 'react';
import './Footer.css'; 

interface FooterProps {
  // Define any props being passed to the Footer component
}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="footer">
      {/* Footer content goes here */}
      <h1>THIS IS FOOTER </h1>
    </footer>
  );
};

export default Footer;