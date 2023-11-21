import React from 'react';

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <label>Search: </label>
      <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
}

export default Filter;
