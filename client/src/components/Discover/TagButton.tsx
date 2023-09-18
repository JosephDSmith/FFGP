import React from 'react';
import { TagType } from '../../functionality/types';

interface TagButtonProps {
  tag: TagType;
  selected: boolean;
  onClick: () => void;
}

const TagButton: React.FC<TagButtonProps> = ({ tag, selected, onClick }) => {
  return (
    <button
      className={"bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 my-1 rounded"}
      onClick={onClick}
    >
      {tag.name}
    </button>
  );
};

export default TagButton;