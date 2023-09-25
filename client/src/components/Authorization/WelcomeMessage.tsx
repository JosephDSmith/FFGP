import React, { FC } from 'react';

const WelcomeMessage: FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
      <p className="text-gray-600 text-sm mb-4">
        Snippets is an online community of educational bits. <br/>
        We suggest you log in with your Google <br />account for full access to all features.
      </p>
    </div>
  );
};

export default WelcomeMessage;