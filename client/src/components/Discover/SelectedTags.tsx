import React from 'react';
import { TagType } from '../../functionality/types';

interface SelectedTagsProps {
  selectedTags: TagType[];
}

const SelectedTags: React.FC<SelectedTagsProps> = ({ selectedTags }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Selected Tags ({selectedTags.length})</h2>
      <div className="space-x-2">
        {selectedTags.map((tag) => (
          <div
            key={tag.id}
            className="bg-gray-500 text-white font-bold py-1 px-2 m-1 rounded inline-block"
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTags;