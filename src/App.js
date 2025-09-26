import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  // Weather code mapping (Open-Meteo style)
  const weatherIcons = {
    0: "assets/clear.svg", // clear sky
    1: "assets/cloudy.svg",
    2: "assets/cloudy.svg",
    3: "assets/cloudy.svg",
    45: "assets/fog.svg",
    48: "assets/fog.svg",
    51: "assets/rain.svg",
    61: "assets/rain.svg",
    71: "assets/snow.svg",
    95: "assets/storm.svg",
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);
    setForecast([]);

    try {
      // 1. Convert location name to lat/lon
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        setError("Location not found");
        return;
      }
      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Fetch weather data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
      );
      const data = await weatherRes.json();

      // 3. Update state
      setWeather({
        location: `${name}, ${country}`,
        ...data.current,
      });
      setForecast(
        data.daily.time.map((date, i) => ({
          date,
          min: data.daily.temperature_2m_min[i],
          max: data.daily.temperature_2m_max[i],
          code: data.daily.weather_code[i],
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong fetching weather data.");
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <form className="search-box" onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" aria-label="Search">
          🔍
        </button>
      </form>

      {error && <p className="errTxt">{error}</p>}

      {weather && (
        <div className="weather-details active">
          <h2>
            Weather in <span>{weather.location}</span>
          </h2>

          <div className="grid">
            <div className="temperature">
              <img
                src={weatherIcons[weather.weather_code] || "assets/clear.svg"}
                alt="weather-icon"
                width="150"
                height="150"
              />
              <p className="temperatureTxt">
                {weather.temperature_2m}
                <sup>°C</sup>
              </p>
              <p>Code: {weather.weather_code}</p>
            </div>

            <ul className="info">
              <li>
                <img src="assets/humidity.svg" alt="humidity" width="32" />
                {weather.relative_humidity_2m}%
              </li>
              <li>
                <img src="assets/wind.svg" alt="wind" width="32" />
                {weather.wind_speed_10m} km/h
              </li>
            </ul>
          </div>

          <h2>Daily Forecast</h2>
          <div className="daily-cards">
            {forecast.map((day, i) => (
              <div key={i} className="card">
                <p>{day.date}</p>
                <img
                  src={weatherIcons[day.code] || "assets/clear.svg"}
                  alt="forecast-icon"
                  width="64"
                  height="64"
                />
                <div className="temps">
                  <span>
                    {day.max}° <sup>↑</sup>
                  </span>
                  <span>
                    {day.min}° <sup>↓</sup>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="attr">
        Image by{" "}
        <a href="https://pixabay.com/users/elg21-3764790/">Enrique</a> from{" "}
        <a href="https://pixabay.com/">Pixabay</a>
      </p>
    </div>
  );
}

export default App;
