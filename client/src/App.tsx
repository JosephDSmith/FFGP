import { useEffect, useState } from 'react'
import SnippetCard from './components/SnippetCard'
import { SnippetType, UserType } from './types'
import TestForm from './components/TestForm'

export default function App() {
  const [snippets, setSnippets] = useState<SnippetType[]>([])
  const [filter, setFilter] = useState<string>('')
  // holds users added by the form - sk
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    fetch('/api/snippets')
      .then(r => r.json())
      .then(d => setSnippets(d))
  }, [])

  //Adds newly added user to stateful users object => updated to use UserType
  const handleAddNewUser = (newUser: UserType) => {
    setUsers((prevUsers) => [...prevUsers, newUser])
  };

  const filteredSnippets = snippets.filter(s => s.content.match(filter))
  return (
    <div className="App">
      {/* Pass function as prop for parent to have access to values */}
      <TestForm addUser={handleAddNewUser} />
      <form>
        <label>Search:</label>
        {filteredSnippets.length} / {snippets.length} match
        <br></br>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.currentTarget.value)}
          type='text'
          value={filter}>
        </input>
      </form>
      {filteredSnippets.map(s => <SnippetCard key={s.id} snippet={s} />)}
    </div>
  );
}