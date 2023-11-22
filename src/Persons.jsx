import React from 'react';

const Persons = ({ persons, onDeletePerson }) => {
  return (
    <div>
      {persons.map(person => (
        <div key={person.id}>
          <p>
            {person.name} - {person.number}
            <button onClick={() => onDeletePerson(person.id)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
