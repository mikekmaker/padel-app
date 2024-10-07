import React, { useState, useEffect } from 'react';
// import 'font-awesome/css/font-awesome.min.css'; // Import FontAwesome

const WeatherForecast = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [closestWeather, setClosestWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = 'b9403d640d898d9c8d9275df6cb33764';

  // Get the user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError('Failed to retrieve location.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  // Fetch weather data when we have the user's location
  useEffect(() => {
    if (location.lat && location.lon) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const closest = getClosestWeather(data.list);
          setClosestWeather(closest);
        })
        .catch((err) => {
          setError('Failed to fetch weather data.');
          console.error(err);
        });
    }
  }, [location]);

  // Get the closest weather forecast to the current datetime
  const getClosestWeather = (forecastList) => {
    const currentTime = new Date();
    return forecastList.reduce((closest, forecast) => {
      const forecastTime = new Date(forecast.dt_txt);
      const closestTime = closest ? new Date(closest.dt_txt) : null;

      // Compare the absolute difference between current and forecast times
      return !closest || Math.abs(forecastTime - currentTime) < Math.abs(closestTime - currentTime)
        ? forecast
        : closest;
    }, null);
  };

  // Function to map weather description to a FontAwesome icon
  const getWeatherIcon = (description) => {
    if (description.includes('cloud')) return <i className="fa fa-cloud" aria-hidden="true"></i>;
    if (description.includes('rain')) return <i className="fa fa-cloud-rain" aria-hidden="true"></i>;
    if (description.includes('clear')) return <i className="fa fa-sun" aria-hidden="true"></i>;
    if (description.includes('snow')) return <i className="fa fa-snowflake" aria-hidden="true"></i>;
    return <i className="fa fa-clock" aria-hidden="true"></i>;
  };

  // Display the closest weather forecast
  const renderWeather = () => {
    if (!closestWeather) return <p>Cargando pron&oacute;stico del clima...</p>;

    const { dt_txt, main, weather } = closestWeather;
    const description = weather[0].description;

    return (
      <div>
        <h3>Pron&oacute;stico del clima</h3>
        <p>{dt_txt}: {main.temp}&#176;C</p>
        <div className="weather-info">
        {getWeatherIcon(description)} {/* Weather icon */}
        <span className="weather-description">{description}</span> {/* Weather description */}
      </div>
      </div>
    );
  };

  return (
    <div>
      {error ? <p>{error}</p> : renderWeather()}
    </div>
  );
};

export default WeatherForecast;
