import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault() 
    const newPerson = { name: newName }
    setPersons([...persons, newPerson])
    setNewName('') 
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person, index) => (
          <p key={index}>{person.name}</p>
        ))}
    </div>
  )

}

export default App
