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
  if (!weatherData || !weatherData.list) return null;

  return (
    <div>
      <h2>Daily Forecast for {cityName}</h2>
      {weatherData.list.map((data, index) => (
        <div key={index}>
          <h3>Date: {new Date(data.dt * 1000).toLocaleDateString()}</h3>
          <p>Temperature:</p>
          <ul>
            <li>Day: {data.main.temp} K</li>
            <li>Min: {data.main.temp_min} K</li>
            <li>Max: {data.main.temp_max} K</li>
            <li>Night: {data.main.temp_night} K</li>
            <li>Evening: {data.main.temp_eve} K</li>
            <li>Morning: {data.main.temp_morn} K</li>
          </ul>
          <p>Feels Like:</p>
          <ul>
            <li>Day: {data.main.feels_like.day} K</li>
            <li>Night: {data.main.feels_like.night} K</li>
            <li>Evening: {data.main.feels_like.eve} K</li>
            <li>Morning: {data.main.feels_like.morn} K</li>
          </ul>
          <p>Pressure: {data.main.pressure} hPa</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Weather Description: {data.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
