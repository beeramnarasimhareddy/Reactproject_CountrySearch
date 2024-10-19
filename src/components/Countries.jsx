import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Filter from './Filter'; 

const url = 'https://restcountries.com/v3.1/all';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data); 
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  const handleSearch = (query) => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleFilter = (region) => {
    if (region === "Filter by region") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country => country.region === region);
      setFilteredCountries(filtered);
    }
  };

  if (loading) {
    return <div>Loading countries...</div>;
  }

  return (
    <>
      <Filter onSearch={handleSearch} onFilter={handleFilter} /> 
      <section className='grid'>   
        {filteredCountries.map((country) => (
          <article key={country.ccn3}>
            <div>
              <img src={country.flags.svg} alt={country.name.common} />
              <div className="details">
                <h3>{country.name.common}</h3>
                <h4>Population: <span>{country.population}</span></h4>
                <h4>Region: <span>{country.region}</span></h4>
                <h4>Capital: <span>{country.capital }</span></h4>
              </div>
              <NavLink to={`/countries/${country.name.common}`} className='btn'>Learn More</NavLink>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Countries;
