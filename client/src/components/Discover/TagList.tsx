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
    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-2">Available Tags ({tags.length})</h2>
      <div className="space-x-2">
        {tags.map((tag) => (
          <TagButton
            key={tag.id}
            tag={tag}
            selected={selectedTags.includes(tag.id)}
            onClick={() => onTagClick(tag.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagList;