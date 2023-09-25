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
    <div className="mb-4 flex flex-wrap">
      <h2 className="w-full text-2xl font-semibold mb-2">Available Tags ({tags.length})</h2>
      <div className="w-full">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-2"
          >
            <TagButton
              tag={tag}
              selected={selectedTags.includes(tag.id)}
              onClick={() => onTagClick(tag.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagList;
