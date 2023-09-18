import React, { useState, useEffect } from "react";
import { Snippet } from "../functionality/types";

interface ContributeProps {}

interface TagType {
  id: number;
  name: string;
}

const Contribute: React.FC<ContributeProps> = () => {
  const [textContent, setTextContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

  console.log(tags);

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
      const newTagObject: TagType = {
        id: tags.length + 1, // You can generate an ID as needed
        name: newTag,
      };
      setTags([...tags, newTagObject]);
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    }
  };

  const handleTagSelect = (selectedTag: string) => {
    setSelectedTags([...selectedTags, selectedTag]);
    setTags(tags.filter((tag) => tag.name !== selectedTag));
  };
  

  const handleSubmit = () => {
    // Check if required fields are filled (text content or image)
    if (!textContent && !image) {
      // You can display an error message or handle it as needed
      return;
    }

    // Create the Snippet object
    // const newSnippet: Snippet = {

    // };

    // Now you can send the newSnippet object to your backend API
    // submitSnippet(newSnippet);

    // Optionally, you can reset the form fields
    setTextContent("");
    setImage(null);
    setSelectedTags([]);
  };

  const submitSnippet = (snippet: Snippet) => {
    // Implement the logic to send the snippet to your backend API here
    // You can use fetch, Axios, or any other method you prefer
    // For example:
    // fetch('/api/snippets', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(snippet),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response from your API
    //   })
    //   .catch((error) => {
    //     // Handle errors here
    //   });
  };

  return (
    <div>
      <h2>Contribute a Snippet</h2>
      <label>Enter Text Content:</label>
      <input type="text" value={textContent} onChange={handleTextChange} />

      <div>
        <span>Or</span>
      </div>

      <label>Upload a Photo:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <div>
        <h3>Select Tags:</h3>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id} onClick={() => handleTagSelect(tag.name)}>
              {tag.name}
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Enter a new tag"
            value={newTag}
            onChange={handleTagChange}
          />
          <button onClick={handleTagSubmit}>Add Tag</button>
        </div>
      </div>

      <div>
        <h3>Selected Tags:</h3>
        <ul>
          {selectedTags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>

      <button onClick={handleSubmit}>Submit Snippet with Tag</button>
    </div>
  );
};

export default Contribute;
