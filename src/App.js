import React, { useEffect, useState } from "react";
import "./App.css";
import LogRocket from "logrocket";
import ReactMapGL from "react-map-gl";
import { Button } from "@material-ui/core";
import ZipForm from "./components/ZipForm";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";
import CityForm from "./components/CityForm";

function App() {
  LogRocket.init("59bmrt/personal-website");
  const WEATHER_API_KEY = process.env.REACT_APP_weather_api_key;
  const MAPBOX_API_KEY = process.env.REACT_APP_mapbox_api_key;
  const [weather, setWeather] = useState(null);
  const [zipCode, setZipCode] = useState("22903");
  const [city, setCity] = useState("Charlottesville");
  const [coordinates, setCoordinates] = useState(null);
  const [hourly, setHourly] = useState("null");
  const [daily, setDaily] = useState("null");
  const [currentToggle, setCurrentToggle] = useState(true);
  const [forecastToggle, setForecastToggle] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 38.0293,
    longitude: -78.4767,
    width: "100%",
    height: "100%",
    zoom: 12,
  });

  // ZIP CODE
  useEffect(() => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", WEATHER_API_KEY);
    url.searchParams.append("zip", `${zipCode}`);
    url.searchParams.append("id", `${city}`);
    url.searchParams.append("units", "metric");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        // also important to check html error codes
        // 200 means no errors
        if (obj.cod === 200) {
          setWeather(obj);
        }
        // 429 means too https requests
        else if (obj.cod === 429) {
          alert("Too many requests, come back later");
        } else {
          setWeather(false);
        }
      });
  }, [zipCode, city, WEATHER_API_KEY]);

  // CITY
  useEffect(() => {
    if (city) {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.append("appid", WEATHER_API_KEY);
      url.searchParams.append("q", city);
      url.searchParams.append("units", "metric");
      fetch(url)
        .then((res) => res.json())
        .then((obj) => setWeather(obj));
    }
  }, [city, WEATHER_API_KEY]);

  // COORDINATES (if weather is valid)
  useEffect(() => {
    if (weather) {
      let l = [];
      l.push(weather.coord.lon);
      l.push(weather.coord.lat);
      setCoordinates(l);
      setViewport({
        ...viewport,
        longitude: weather.coord.lon,
        latitude: weather.coord.lat,
      });
    }
  }, [weather]);

  // HOURLY
  useEffect(() => {
    if (coordinates) {
      const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
      url.searchParams.append("appid", WEATHER_API_KEY);
      url.searchParams.append("lon", coordinates[0]);
      url.searchParams.append("lat", coordinates[1]);
      url.searchParams.append("exclude", "current,minutely,alerts");
      url.searchParams.append("units", "metric");
      fetch(url)
        .then((res) => res.json())
        .then((obj) => setHourly(obj));
    }
  }, [coordinates, WEATHER_API_KEY]);

  // DAILY
  useEffect(() => {
    if (coordinates) {
      const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
      url.searchParams.append("appid", WEATHER_API_KEY);
      url.searchParams.append("cnt", 16);
      url.searchParams.append("lon", coordinates[0]);
      url.searchParams.append("lat", coordinates[1]);
      url.searchParams.append("exclude", "current,minutely,alerts");
      url.searchParams.append("units", "metric");
      fetch(url)
        .then((res) => res.json())
        .then((obj) => setDaily(obj));
    }
  }, [coordinates, WEATHER_API_KEY]);

  const showCurrent = () => {
    setCurrentToggle(!currentToggle);
  };
  const showHourly = () => {
    setForecastToggle(0);
  };
  const showDaily = () => {
    setForecastToggle(1);
  };

  const goToLocation = () => {
    setViewport({
      ...viewport,
      longitude: coordinates[1],
      latitude: coordinates[0],
      // transitionDuration: 1000,
    });
  };

  return (
    <div>
      {/* MAPBOX */}
      <div className="mapbox-container">
        <div className="reactmapgl-view">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={MAPBOX_API_KEY}
            mapStyle="mapbox://styles/cpn1/cko345bp11the17nz5v85j4tz"
            // mapStyle="mapbox://styles/cpn1/cko4ramgv1hzh17mqdhtm19bq"
            onViewportChange={(viewport) => {
              setViewport(viewport);
            }}
          ></ReactMapGL>
        </div>
      </div>
      <div className="top-input">
        {/* ZIP FORM */}
        <ZipForm
          className="zipForm"
          setZipCode={setZipCode}
          goToLocation={goToLocation}
        />
        {/* CITY FORM */}
        {/* <CityForm className="cityForm" setCity={setCity} /> */}
      </div>
      <div className="mainDisplay">
        {weather && <h1 className="location-title">{weather.name}</h1>}
        {/* TOGGLES */}
        <div className="viewToggle">
          {/* CURRENT */}
          <Button
            onClick={showCurrent}
            style={{
              marginRight: "10px",
              background: "rgb(23, 35, 91)",
              color: "white",
            }}
          >
            Current Weather
          </Button>
        </div>
        {/* WEATHER DISPLAY */}
        {/* LOCATION TITLE */}
        {/* {weather && <h1 className="location-title">{weather.name}</h1>} */}

        {/* CURRENT WEATHER */}
        {weather && currentToggle && (
          <CurrentWeather
            // currentToggle
            main={weather.weather[0].main}
            temp={weather.main.temp}
            feel={weather.main.feels_like}
            desc={weather.weather[0].description}
            hum={weather.main.humidity}
          />
        )}
      </div>
      <div className="viewToggle">
        {/* HOURLY */}
        <Button
          onClick={showHourly}
          style={{
            marginRight: "10px",
            background: "rgb(23, 35, 91)",
            color: "white",
          }}
        >
          Hourly Forecast
        </Button>

        <Button
          style={{
            // marginRight: "10px",
            background: "rgb(23, 35, 91)",
            color: "white",
          }}
          onClick={showDaily}
        >
          Daily Forecast
        </Button>
      </div>
      <div className="forecast-view">
        {/* HOURLY WEATHER */}
        {hourly &&
          forecastToggle === 0 &&
          hourly.hourly.map((h) => (
            <HourlyWeather
              temp={h.temp}
              feel={h.feels_like}
              main={h.weather[0].main}
              time={h.dt}
              hum={h.humidity}
            />
          ))}
        {/* DAILY WEATHER */}
        {daily &&
          forecastToggle == 1 &&
          daily.daily.map((d) => (
            <DailyWeather
              main={d.weather[0].main}
              time={d.dt}
              dayTemp={d.temp.day}
              minTemp={d.temp.min}
              maxTemp={d.temp.max}
              nightTemp={d.temp.night}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
