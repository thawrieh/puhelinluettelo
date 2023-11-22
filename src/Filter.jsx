import React from 'react';

const Filter = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <label>Filter shown with </label>
      <input value={searchTerm} onChange={onSearchChange} />
    </div>
  );
};

export default Filter;
