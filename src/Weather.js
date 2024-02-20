import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [ready, setready] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      temperature: response.data.main.temp,
      wind: 12,
      city: response.data.name,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      iconUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    });
    setready(true);
  }

  if (ready) {
    return (
      <div className="weather">
        <form>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city"
                className="form-control"
                autoFocus="on"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-secondary w-100"
              />
            </div>
          </div>
        </form>
        <h1>{weatherData.city}</h1>
        <ul>
          <li>Wednesday 08:00</li>
          <li>{weatherData.description}</li>
        </ul>
        <div className="row mt-4">
          <div className="col-6">
            <div className="clearfix">
              <img
                src={weatherData.iconUrl}
                alt={weatherData.description}
                className="float-left"
              />

              <span className="temperature">
                {Math.round(weatherData.temperature)}
              </span>
              <span className="unit">°C</span>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>Precipitation: 15%</li>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind: 5 km/h</li>
            </ul>
          </div>
        </div>
        <div className="sentence">Forecast coming soon..</div>
      </div>
    );
  } else {
    const apiKey = "5c3947ac0468bdb0b2d7714c9e35d56e";
    let city = "Cape Town";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
