import React, { useState } from 'react';

const Filter = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Filter by region');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilter = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    onFilter(region);
  };

  return (
    <section className='filter'>
      <form className='form-control'>
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder='Search for a country'
        />
      </form>
      <div className='region-filter'>
        <select
          value={selectedRegion}
          onChange={handleFilter}
          className='select'
        >
          <option value="Filter by region">Filter by region</option>
          <option value="Africa">Africa</option>
          
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
