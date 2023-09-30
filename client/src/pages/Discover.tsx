import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TagType, SnippetType } from '../functionality/types';
import TagList from '../components/Discover/TagList';
import SelectedTags from '../components/Discover/SelectedTags';
import SyntaxHighlighter from 'react-syntax-highlighter';
import style from "react-syntax-highlighter/dist/esm/styles/hljs/lightfair";


interface DiscoverProps {
  // Define any props you need here
}

const Discover: React.FC<DiscoverProps> = () => {
  const { tagId } = useParams();
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<SnippetType[]>([]);
  console.log(tagId);

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

  const pickLanguageForm = (snippet: SnippetType): string => {
    if (!snippet.tags || snippet.tags.length === 0) return 'markdown';
    const tag = snippet.tags[0].name;
    if (tag === 'python') return 'python';
    if (tag === 'javascript') return 'javascript';
    if (tag === 'c++') return 'cpp';
    if (tag === 'java') return 'java';
    return 'markdown';
  };

  return (
    <div className="">
      <TagList tags={tags} selectedTags={selectedTags} onTagClick={handleTagClick} />
      <SelectedTags selectedTags={selectedTagObjects} onTagClick={() => null} />
      <div className="bg-green-50 py-6">
      <div className="mx-auto px-10 mt-10 mb-24">
      <div className="flex justify-end mt-2">
        <span className="text-sm text-slate-500 font-semibold">Results</span>
        <span className="text-sm text-slate-500 ml-2">({filteredSnippets.length})</span>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
          {filteredSnippets.length > 0 ? (
            filteredSnippets.map((snippet) => (
              <div key={snippet.id} className="border rounded-lg p-4 bg-white text-sm">
                <SyntaxHighlighter language={pickLanguageForm(snippet)} wrapLines={true} style={style}>
                  {snippet.text_content}
                </SyntaxHighlighter>
              </div>
            ))
          ) : (
            <div>
            <p>No results found.</p>
            {filteredSnippets.length === 0 && (
              <button
                className="bg-white hover:bg-green-200 text-slate-500 py-2 px-4 my-1 rounded"
                onClick={handleClearFilter}
              >
                Clear Filter
              </button>
            )}
            </div>
          )}
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default Discover;