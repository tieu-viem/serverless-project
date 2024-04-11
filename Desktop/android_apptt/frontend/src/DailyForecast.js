import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = '92ee9ea15a56c09a21bc255b83232606';

const DailyForecast = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching daily forecast:', error);
        setError('Failed to fetch daily forecast data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weatherData) return null;

  return (
    <div>
      <h2>Daily Forecast for {cityName}</h2>
      <p>Country: {weatherData.city.country}</p>
      <p>Timezone: {weatherData.city.timezone}</p>
      <h3>City List:</h3>
      <ul>
        {weatherData.list.map((cityData, index) => (
          <li key={index}>
            <p>City Name: {cityData.city.name}</p>
            <p>Latitude: {cityData.city.coord.lat}</p>
            <p>Longitude: {cityData.city.coord.lon}</p>
            <p>Country: {cityData.city.country}</p>
            <p>Population: {cityData.city.population}</p>
            {/* Display weather forecast for the city */}
            <p>Temperature: {cityData.main.temp} K</p>
            <p>Min Temperature: {cityData.main.temp_min} K</p>
            <p>Max Temperature: {cityData.main.temp_max} K</p>
            <p>Pressure: {cityData.main.pressure} hPa</p>
            <p>Humidity: {cityData.main.humidity}%</p>
            <p>Weather Description: {cityData.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
