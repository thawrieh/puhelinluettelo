import React from 'react';

const PersonForm = ({ newPerson, onPersonChange, onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        Name: <input value={newPerson.name} onChange={(e) => onPersonChange('name', e.target.value)} />
      </div>
      <div>
        Number: <input value={newPerson.number} onChange={(e) => onPersonChange('number', e.target.value)} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
