import React, { useState, useEffect } from "react";
import personService from "./personService";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import './App.css';
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); 
  useEffect(() => {
    personService
      .getAllPersons()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addPerson = () => {
    personService
      .addPerson(newPerson)
      .then((data) => {
        setPersons([...persons, data]);
        setNewPerson({ name: "", number: "" });
        setErrorMessage(`${newPerson.name} added to the phonebook!`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error adding person:", error);
        setErrorMessage("An error occurred while adding the person. Please try again.");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const deletePerson = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage(`${name} deleted from the phonebook!`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePersonChange = (field, value) => {
    setNewPerson({ ...newPerson, [field]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPerson();
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} /> 
      <Filter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newPerson={newPerson} onPersonChange={handlePersonChange} onFormSubmit={handleFormSubmit} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDeletePerson={deletePerson} />
    </div>
  );
};

export default App;
