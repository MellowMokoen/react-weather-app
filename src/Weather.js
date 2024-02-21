import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherDetails from "./WeatherDetails";

export default function Weather(props) {
  // Initialize state variables for city and weather data
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });

  // Function to handle response from API call
  function handleResponse(response) {
    console.log(response.data);

    // Update weather data state with response data
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      date: new Date(response.data.dt * 1000),
      wind: response.data.wind.speed,
      city: response.data.name,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
    });
  }

  // Function to initiate API call to search for weather data
  function search() {
    const apiKey = "5c3947ac0468bdb0b2d7714c9e35d56e";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  // Function to handle city input change
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  // If weather data is ready, render weather information
  if (weatherData.ready) {
    return (
      <div className="weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city"
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
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
        <WeatherDetails data={weatherData} />
      </div>
    );

    // If weather data is not ready, initiate search and display loading message
  } else {
    search();
    return "Loading...";
  }
}
