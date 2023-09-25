import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../functionality/UserContext';
import { SnippetType } from '../functionality/types';

interface UserContributionsProps {}

const UserContributions: React.FC<UserContributionsProps> = ({}) => {
  const { user } = useContext(UserContext)!;
  const [userSnippets, setUserSnippets] = useState<SnippetType[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(''); // State for edited text
  const [editingSnippetId, setEditingSnippetId] = useState<number | null>(null); // State to track the snippet being edited

  useEffect(() => {
    if (user) {
      fetch('/api/snippets')
        .then((r) => r.json())
        .then((data: SnippetType[]) => {
          const filteredSnippets = data.filter((snippet) => snippet.user_id === user.id);
          setUserSnippets(filteredSnippets);
        })
        .catch((error) => {
          console.error('Error fetching snippets:', error);
        });
    }
  }, [user]);

  const handleEdit = (snippetId: number, initialText: string) => {
    setEditingSnippetId(snippetId);
    setEditMode(true);
    setEditedText(initialText);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedText('');
    setEditingSnippetId(null);
  };

  // This not yet functional => needs user_id from user session 
  const handleSave = (snippetId: number) => {
    fetch(`/api/snippets/${snippetId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text_content: editedText }),
    })
      .then((response) => {
        if (response.ok) {

          setUserSnippets((prevSnippets) =>
            prevSnippets.map((snippet) =>
              snippet.id === snippetId ? { ...snippet, text_content: editedText } : snippet
            )
          );
          setEditMode(false);
          setEditedText('');
          setEditingSnippetId(null);
        } else {
          console.error('Failed to update the snippet.');
        }
      })
      .catch((error) => {
        console.error('Error updating the snippet:', error);
      });
  };

  // This not yet functional => needs user_id from user session 
  const handleDelete = (snippetId: number) => {
    fetch(`/api/snippets/${snippetId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setUserSnippets((prevSnippets) =>
            prevSnippets.filter((snippet) => snippet.id !== snippetId)
          );
        } else {
          console.error('Failed to delete the snippet.');
        }
      })
      .catch((error) => {
        console.error('Error deleting the snippet:', error);
      });
  };
  return (
    <div className="mt-32 text-center">
      <h2 className="text-2xl mb-4">Thank you for your contributions!</h2>
      <h3>You can edit or delete any of them here.</h3>
      <div className="flex justify-center items-center p-16">
        {userSnippets.map((snippet) => (
          <div key={snippet.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            {editMode && editingSnippetId === snippet.id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="border rounded p-2 mr-2"
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                  onClick={() => handleSave(snippet.id)}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {snippet.text_content}
                <div className="mt-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded mr-2"
                    onClick={() => handleEdit(snippet.id, snippet.text_content)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleDelete(snippet.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserContributions;