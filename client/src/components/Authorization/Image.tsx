import React, { FC } from 'react';

interface ImageProps {
  src: string;
  alt: string;
}

const Image: FC<ImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-5 h-5 inline-block mr-2" />;
};

export default Image;