import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TagType, SnippetType } from '../functionality/types';
import TagList from '../components/Discover/TagList';
import SelectedTags from '../components/Discover/SelectedTags';

interface DiscoverProps {
  // Define any props you need here
}

const Discover: React.FC<DiscoverProps> = () => {
  const { tagId } = useParams();
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<SnippetType[]>([]);
  console.log(tagId)

  // Function to check URL parameter and set the corresponding tag as selected
  const checkURLParameter = () => {
    if (tagId) {
      const tagIdInt = parseInt(tagId, 10);
      if (!isNaN(tagIdInt) && !selectedTags.includes(tagIdInt)) {
        setSelectedTags([tagIdInt]);
      }
    }
  };

  // Fetch tags from the API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags'); // Replace with your API endpoint
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Fetch snippets from the API
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch('/api/snippets'); // Replace with your API endpoint
        const data = await response.json();
        setSnippets(data);
        setFilteredSnippets(data); // Initialize filteredSnippets with all snippets
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };

    fetchSnippets();
  }, []);

  // Check URL parameter when the component loads
  useEffect(() => {
    checkURLParameter();
  }, []);

  // Update filteredSnippets when selectedTags change
  useEffect(() => {
    // Filter snippets based on selected tags
    const filtered = snippets.filter((snippet) => {
      if (selectedTags.length === 0) {
        return true; // No tags selected, show all snippets
      }
      return selectedTags.every((tagId) =>
        snippet.tags ? snippet.tags.some((tag) => tag.id === tagId) : false
      );
    });
    setFilteredSnippets(filtered);
  }, [selectedTags, snippets]);

  const handleTagClick = (tagId: number) => {
    // toggles tag off if re-clicked
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleClearFilter = () => {
    setSelectedTags([]); // Clear selected tags
  };

  // Get selected tag objects based on selected tag IDs and filter out undefined values
  const selectedTagObjects = selectedTags
    .map((tagId) => tags.find((tag) => tag.id === tagId))
    .filter((tag) => tag !== undefined) as TagType[];

  return (
    <div className="container mx-auto p-4">
      <TagList tags={tags} selectedTags={selectedTags} onTagClick={handleTagClick} />
      <SelectedTags selectedTags={selectedTagObjects} />

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Results ({filteredSnippets.length})
        </h2>
        {filteredSnippets.length > 0 ? (
          <ul>
            {filteredSnippets.map((snippet) => (
              <li key={snippet.id} className="mb-2">
                {snippet.text_content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      {filteredSnippets.length === 0 && (
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 my-1 rounded"
          onClick={handleClearFilter}
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default Discover;