import React, { useState, useEffect } from "react";
import TagList from '../components/Discover/TagList';
import SelectedTags from '../components/Discover/SelectedTags';
import { SnippetType, TagType } from '../functionality/types';
import { useNavigate } from 'react-router-dom';

interface ContributeProps { }

const Contribute: React.FC<ContributeProps> = () => {
  const [textContent, setTextContent] = useState<string>("");
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const [contribution, setContribution] = useState<SnippetType | null>(null);

  const nav = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags"); 
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(event.target.value);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleTagSubmit = () => {
    if (newTag.trim() !== "") {
      fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: newTag
        })
      })
        .then(r => r.json())
        .then(d => {
          setTags([...tags, d]);
          setSelectedTags([...selectedTags, d.id]);
          setNewTag("");
          setIsAddingTag(false); // Hide the input and "Add Tag" button after submission
        })
    }
  };

  const handleTagSelect = (selectedTag: number) => {
    if (selectedTags.indexOf(selectedTag) > -1) return;
    setSelectedTags(selectedTags => [...selectedTags, selectedTag]);
  };

  const handleTagDeselect = (deselectedTag: number) => {
    setSelectedTags(selectedTags => selectedTags.filter(t => t !== deselectedTag));
  }

  const handleSubmit = () => {
    console.log(textContent, selectedTags);
    fetch('/api/snippets', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        text_content: textContent,
        selected_tags: selectedTags
      })
    })
      .then(r => r.json())
      .then((d: SnippetType) => {
        setContribution(d);
      })
      .catch(error => {
        console.error('Error submitting snippet:', error);
        alert('An error occurred while submitting the snippet.');
      });
  
    setTextContent("");
    setSelectedTags([]);
  };

  const selectedTagObjects = selectedTags
    .map((tagId) => tags.find((tag) => tag.id === tagId))
    .filter((tag) => tag !== undefined) as TagType[];
if (contribution) {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center text-slate-500">
      <div className="text-center">
        <div className="text-2xl font-bold mb-4">Thank you for your contribution!</div>
        <div className="mb-4">
          <b>Text Content:</b> {contribution.text_content}
        </div>
        {contribution.tags && contribution.tags.length > 0 && (
          <div className="mb-2">
            <b>Tags:</b> {contribution.tags.map((tag, index) => (
              <span key={tag.id}>
                {index > 0 && ', '}
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
  return (
    <div>
      <div className='languages'>
        <div className="bg-green-50 py-16">
          <div className="mx-auto text-center max-w-2xl">
            <p className="pt-4 text-base text-slate-500 md: ml-5 mr-5">
              We invite you to become a valued contributor to our growing community. Share
              your expertise, insights, and solutions with others by uploading your own
              contributions.
            </p>
            
          </div>
        </div>
        
        <div className="bg-white mb-20">
          <TagList tags={tags} selectedTags={selectedTags} onTagClick={handleTagSelect} />
            
          <SelectedTags selectedTags={selectedTagObjects} onTagClick={handleTagDeselect} />
          <div className="text-center">
            <div className="mx-48 my-20 md: ml-10 mr-10">
            <textarea
              cols={60}
              rows={8}
              placeholder="Snippet text here"
              value={textContent}
              onChange={handleTextChange}
              className="rounded-lg border-2 border-gray-300 p-6 w-full"
            />
            </div>

            <div className="mt-8 flex justify-center mb-10">
              <button
                onClick={handleSubmit}
                className="text-lg rounded-full px-8 py-4 bg-green-200 hover:bg-red-200 text-slate-500 transition-colors duration-300"
              >
                Submit Snippet
              </button>
            </div>

            {/* new tag section */}
            <div className="bg-green-50 py-10">
              <h1>Can't find the tag you're looking for? </h1> 
              {isAddingTag ? (
                <div className="mx-48 md: ml-20 mr-20">
                  <input
                    type="text"
                    placeholder="Enter a new tag"
                    value={newTag}
                    onChange={handleTagChange}
                    className="p-2 mb-10 mr-5 rounded-lg border-2 border-gray-200 text-center w-full"
                  />
                  <button
                    onClick={handleTagSubmit}
                    className="rounded-lg bg-green-200 p-2 hover:bg-red-200 text-slate-500"
                  >
                    Add Tag
                  </button>
                  <br/><br/>
                  <button
                    onClick={() => setIsAddingTag(false)}
                    className="bg-red-400 rounded-full px-2 my-2 hover:bg-red-500"
                  >
                    -
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingTag(true)} 
                  className="bg-green-300 rounded-full px-2 my-2"
                >
                  +
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Contribute;