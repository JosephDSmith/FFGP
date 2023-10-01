import React from 'react';
import CountUp from 'react-countup';

interface CounterHeaderProps {
  count: number;
}

const CounterHeader: React.FC<CounterHeaderProps> = ({ count }) => {
  return (
    <div className="pb-32 text-center text-sw text-slate-500 bg-white">
      <h2 className="text-2xl text-blue-300"><CountUp end={count} duration={2} separator="," /> snippets and counting!</h2>
        

    </div>
  );
};

export default CounterHeader;