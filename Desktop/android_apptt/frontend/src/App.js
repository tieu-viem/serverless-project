import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherMap from './WeatherMap';
import WeatherCurrent from './weatherCurrent';
import DailyForecast from './DailyForecast'; // Import the DailyForecast class

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cityName) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    setError('');
    const apiKey = 'fc53a6536f8800b75b7c2399c1eb2f71';
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather Information</h1>
      <form onSubmit={handleSubmit}>
        <h2><label>
          Enter City Name:
          <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
        </label>
        <button type="submit">Search</button></h2>
      </form>
      {cityName && <WeatherCurrent cityName={cityName} />}
      {cityName && <DailyForecast cityName={cityName} />}
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          {weatherData.map(city => (
            <div key={city.name}>
              <h2>{city.name}</h2>
              <ul>
                {city.local_names ? Object.entries(city.local_names).map(([language, localName]) => (
                  <li key={language}>{language}: {localName}</li>
                )) : null}<p>
                <li>Latitude: {city.lat}</li>
                <li>Longitude: {city.lon}</li>
                <li>Country: {city.country}</li>
                <li>State: {city.state}</li></p>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherComponent;
