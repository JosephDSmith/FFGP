import React from 'react';
import CountUp from 'react-countup';

interface CounterHeaderProps {
  count: number;
}

const CounterHeader: React.FC<CounterHeaderProps> = ({ count }) => {
  return (
    <div className="p-24 w-100% text-center text-sw text-slate-500 bg-green-50">
      <p className="text-base">
        At [snippets], it's our amazing community of users that makes us stand out! <br />
        Just like you, passionate individuals from all around the world have contributed to our growing library of code snippets. <br />
        Thanks to your dedication, we've amassed a collection of
      </p>
      <p className="text-xl font-bold">
        <CountUp end={count} duration={2} separator="," /> snippets and counting!
      </p>
    </div>
  );
};

export default CounterHeader;