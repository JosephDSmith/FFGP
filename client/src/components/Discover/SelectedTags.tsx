import React from 'react';
import { TagType } from '../../functionality/types';
import TagButton from './TagButton';

interface SelectedTagsProps {
  selectedTags: TagType[];
}

const SelectedTags: React.FC<SelectedTagsProps> = ({ selectedTags }) => {
  return (
    <div className="mx-48 my-10 md: ml-10 mr-10">
      <div className="flex justify-end mt-2">
        <span className="text-sm text-slate-500 font-semibold">Selected Tags</span>
        <span className="text-sm text-slate-500 ml-2">({selectedTags.length})</span>
      </div>
      <div className="border  rounded-lg p-4 mt-2 flex flex-wrap gap-5">
        {selectedTags.map((tag) => (
          <div key={tag.id} className="mb-2">
            <TagButton
              tag={tag}
              selected={true}
              color="red"
              onClick={() => {
                // Handle click action if needed
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTags;