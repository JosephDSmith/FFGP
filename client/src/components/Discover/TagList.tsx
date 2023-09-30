import React from 'react';
import TagButton from './TagButton';
import { TagType } from '../../functionality/types';

interface TagListProps {
  tags: TagType[];
  selectedTags: number[];
  onTagClick: (tagId: number) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, selectedTags, onTagClick }) => {
  return (
    <div className="mx-48 mt-20 md: ml-10 mr-10">
      {/* count of available tags */}
      <div className="flex justify-end mt-2">
        <span className="text-sm text-slate-500 font-semibold">Available Tags</span>
        <span className="text-sm text-slate-500 ml-2">({tags.length})</span>
      </div>

      {/* container displaying available tags */}
      <div className="border rounded-lg p-2 flex flex-wrap justify-start gap-1 bg-white">
        {tags.map((tag) => (
          <div key={tag.id} className="mb-2">
            <TagButton
              tag={tag}
              selected={selectedTags.includes(tag.id)}
              color= "blue"
              onClick={() => onTagClick(tag.id)}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default TagList;