import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Country.css'; 

const Country = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        setCountry(data[0]); // Assuming the API returns an array of countries
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [name]);

  if (loading) return <div className="loading">Loading country details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!country) return <div>No country data available.</div>;

  return (
    <div className="country-details">
      <NavLink to="/" className="btn btn-light back-button">
        <i className='fas fa-arrow-left'></i> Back Home
      </NavLink>
      <h2>{country.name.common}</h2>
      <div className="country-info">
        <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" />
        <div className="details">
          <h3>Details:</h3>
          <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A'}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Sub Region:</strong> {country.subregion}</p>
          <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
          <p><strong>Top Level Domain:</strong> {country.tld ? country.tld[0] : 'N/A'}</p>
          <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ') : 'N/A'}</p>
          <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
          <p><strong>Borders:</strong> {country.borders && country.borders.length > 0 ? country.borders.join(', ') : 'No borders'}</p>
        </div>
      </div>
    </div>
  );
};

export default Country;
