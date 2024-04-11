import React from 'react';

const apiKey = '92ee9ea15a56c09a21bc255b83232606';  

const WeatherMap = ({ weatherData }) => {
  const mapUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${apiKey}`;

  return (
    <div>
      {weatherData.list && (
        <div>
          <h2>Weather Forecast</h2>
          <ul>
            {weatherData.list.map(forecast => (
              <li key={forecast.dt}>
                <p>Date/Time: {forecast.dt_txt}</p>
                <p>Temperature: {forecast.main.temp} Kelvin</p>
                <p>Feels Like: {forecast.main.feels_like} Kelvin</p>
                <p>Min Temperature: {forecast.main.temp_min} Kelvin</p>
                <p>Max Temperature: {forecast.main.temp_max} Kelvin</p>
                <p>Pressure: {forecast.main.pressure} hPa</p>
                <p>Humidity: {forecast.main.humidity}%</p>
                <p>Weather Description: {forecast.weather[0].description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};  

export default WeatherMap;
