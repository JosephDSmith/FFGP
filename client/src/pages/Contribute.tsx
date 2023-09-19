import React, { useState, useEffect } from "react";
import { Snippet } from "../functionality/types";
import TagList from '../components/Discover/TagList';
import SelectedTags from '../components/Discover/SelectedTags';
import { TagType } from '../functionality/types';

interface ContributeProps { }


const Contribute: React.FC<ContributeProps> = () => {
  const [textContent, setTextContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [showNewTagInput, setShowNewTagInput] = useState<boolean>(false);

  // Fetch tags from the API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags"); // Replace with your API endpoint
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextContent(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleTagSubmit = () => {
    if (newTag.trim() !== "") {
      fetch('/api/tags', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          name: newTag
        })
      })
      .then(r => r.json())
      .then(d => {
        setTags([...tags, d]);
        setSelectedTags([...selectedTags, d.id]);
        setNewTag("");
      })
      // const newTagObject: TagType = {
      //   id: tags.length + 1, // You can generate an ID as needed
      //   name: newTag,
      //   snippets: []
      // };
      // setTags([...tags, newTagObject]);
      // setSelectedTags([...selectedTags, newTagObject.id]);
      // setNewTag("");
    }
  };

  const handleTagSelect = (selectedTag: number) => {
    setSelectedTags(selectedTags => [...selectedTags, selectedTag]);
  };


  const handleSubmit = () => {
    console.log(textContent, selectedTags, image);
    fetch('/api/snippets', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        text_content: textContent,
        image_content: image,
        selected_tags: selectedTags
      })
    })
    .then(r => r.json())
    .then(d => console.log(d))

    setTextContent("");
    setImage(null);
    setSelectedTags([]);
  };


  const selectedTagObjects = selectedTags
    .map((tagId) => tags.find((tag) => tag.id === tagId))
    .filter((tag) => tag !== undefined) as TagType[];


  return (
    <div>
      <div className='mx-auto max-w-2xl p-10'>
        We invite you to become a valued contributor to our growing community. Share
        your expertise, insights, and solutions with others by uploading your own
        contributions.
      </div>
      <div className='bg-white mb-20'>
        <div className='mx-auto  max-w-2xl p-10'>

          <div className="flex-row  text-center">
            <div className="text-xl m-5"> Contribute a snippet</div>
            <input
              type="text"
              placeholder='Snippet text here'
              value={textContent}
              onChange={handleTextChange}
              className="rounded-lg border-2 border-gray-300 text-center m-5  w-full h-20"
            />
            <div>or</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="m-5"
            />
            <TagList tags={tags} selectedTags={selectedTags} onTagClick={handleTagSelect} />
            <SelectedTags selectedTags={selectedTagObjects} />


            <div className='m-5'>
              <input
                type="text"
                placeholder="Enter a new tag"
                value={newTag}
                onChange={handleTagChange}
                className='p-2 mr-5 rounded-lg border-2 border-gray-200 text-center'
              />
              <button
                onClick={handleTagSubmit}
                className='rounded-lg bg-blue-200 p-2 hover:bg-blue-400 '
              >
                Add Tag
              </button>
            </div>
          </div>

        </div>
        <div className="text-center pb-10">
        <button
          className='rounded-md bg-blue-200 p-5 text-center'
          onClick={handleSubmit}
        >
          Submit Snippet with Tag
        </button>
        </div>
      </div>


    </div>
  );
};

export default Contribute;
