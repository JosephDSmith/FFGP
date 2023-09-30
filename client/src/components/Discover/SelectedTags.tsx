import React from 'react';
import { TagType } from '../../functionality/types';
import TagButton from './TagButton';

interface SelectedTagsProps {
  selectedTags: TagType[];
  onTagClick: (deselectedTag: number) => void;
}

const SelectedTags: React.FC<SelectedTagsProps> = ({ selectedTags, onTagClick}) => {
  return (
    <div className="mx-48 my-10 md: ml-10 mr-10">
      <div className="flex flex-wrap justify-end mt-2">
        <span className="text-sm text-slate-500 font-semibold">Selected Tags</span>
        <span className="text-sm text-slate-500 ml-2">({selectedTags.length})</span>
      </div>
      
      <div className="border rounded-lg p-2 flex flex-wrap gap-1 bg-white">
        {selectedTags.map((tag) => (
          <div key={tag.id} className="mb-2">
            <TagButton
              tag={tag}
              selected={true}
              color="red"
              onClick={() => {
                onTagClick(tag.id)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTags;