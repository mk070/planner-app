import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '84decb20aa6f2685f9102d4452926080'; // Replace with your actual API key
  const [city, setCity] = useState(''); // State to hold the city name input

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch weather data from API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        const data = await response.json();

        // Update weather data state
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city !== '') {
      // Fetch weather data only if the city is provided
      fetchWeatherData();
    }
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value); // Update city state with the input value
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          {weatherData.main && weatherData.main.temp && (
            <p>Temperature: {weatherData.main.temp}°C</p>
          )}
          {weatherData.weather && weatherData.weather.length > 0 && (
            <p>Weather: {weatherData.weather[0].main}</p>
          )}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
