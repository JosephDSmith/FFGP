import React from 'react';

interface CounterHeaderProps {
  count: number
}

const CounterHeader: React.FC<CounterHeaderProps> = ({ count }) => {
  return (
    <div className="text-center bg-blue-400 p-24 w-100% ">
      <p className="text-base">
        At [snippets], it's our amazing community of users that makes us stand out! <br />
        Just like you, passionate individuals from all around the world have contributed to our growing library of code snippets. <br />
        Thanks to your dedication, we've amassed a collection of
      </p>
      <p className="text-xl font-bold">
        {count} snippets and counting!
      </p>
    </div>
  )
}

export default CounterHeader