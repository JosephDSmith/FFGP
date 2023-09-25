import React from 'react';
import { TagType } from '../../functionality/types';

interface TagButtonProps {
  tag: TagType;
  selected: boolean;
  color: string;
  onClick: () => void;
}

const TagButton: React.FC<TagButtonProps> = ({ tag, selected, onClick, color }) => {
  const bgColor = `bg-${color}-400`;
  const hoverColor = `bg-${color}-500`;

  return (
    <button
      className={`${bgColor} hover:${hoverColor} text-white py-2 px-4 my-1 rounded`}
      onClick={onClick}
    >
      {tag.name}
    </button>
  );
};

export default TagButton;