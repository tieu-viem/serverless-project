const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3002;

// API endpoint for weather data
app.get('/api/weather', async (req, res) => {
  try {
    // Call OpenWeatherMap API to get weather data
    const apiKey = 'ff6089b9ef7b0dc5b781b9501c1ff175';
    const city = 'London';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    // Fetch weather data from the API
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Send weather data as JSON response
    res.json(weatherData);
  } catch (error) {
    // Handle errors
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
