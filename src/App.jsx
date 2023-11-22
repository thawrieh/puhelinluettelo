import React, { useState,useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './personService';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isNameAlreadyAdded = persons.some(person => person.name === newName);

    if (isNameAlreadyAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
      personService
        .create(newPerson)
        .then(data => {
          console.log("Person added to the server:", data);
        })
        .catch(error => {
          console.error("Error adding person to the server:", error);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={handleFormSubmit}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App;
