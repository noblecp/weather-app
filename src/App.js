import React, { useEffect, useState } from "react";
import "./App.css";
// import ReactMapGL from "react-map-gl";
import { Button } from "@material-ui/core";
import ZipForm from "./components/ZipForm";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";
import CityForm from "./components/CityForm";

function App() {
  const WEATHER_API_KEY = process.env.REACT_APP_weather_api_key;
  // const MAPBOX_API_KEY = process.env.REACT_APP_mapbox_api_key;
  const [weather, setWeather] = useState(null);
  const [zipCode, setZipCode] = useState("22903");
  const [city, setCity] = useState("Charlottesville");
  const [coordinates, setCoordinates] = useState(null);
  const [hourly, setHourly] = useState("null");
  const [daily, setDaily] = useState("null");
  const [tabToggle, setTabToggle] = useState(0);

  // const [viewport, setViewport] = useState({
  //   latitude: 38.0293,
  //   // latitude: coordinates[1],
  //   longitude: -78.4767,
  //   // longitude: coordinates[0],
  //   width: "30vw",
  //   height: "30vh",
  //   zoom: 10
  // });

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

  // load coordinates from the weather, if valid
  useEffect(() => {
    if (weather) {
      let l = [];
      l.push(weather.coord.lon);
      l.push(weather.coord.lat);
      setCoordinates(l);
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
      url.searchParams.append("cnt", 2);
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
    setTabToggle(0);
  };
  const showHourly = () => {
    setTabToggle(1);
  };
  const showDaily = () => {
    setTabToggle(2);
  };

  return (
    <div
      className="container"
      // style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}
    >
      <div className="topInput">
        {/* ZIP FORM */}
        <ZipForm className="zipForm" setZipCode={setZipCode} />
        <CityForm className="cityForm" setCity={setCity} />
      </div>

      <div className="mainDisplay">
        {/* <p>{weather.coord.lon}</p>
        <p>{weather.coord.lat}</p> */}

        {/* TOGGLES */}
        <div
          className="viewToggle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* CURRENT */}
          <Button
            onClick={showCurrent}
            style={{ marginRight: "10px", border: "black solid 1px" }}
          >
            Current Weather
          </Button>
          {/* HOURLY */}
          <Button
            onClick={showHourly}
            style={{ marginRight: "10px", border: "black solid 1px" }}
          >
            Hourly Forecast
          </Button>

          <Button onClick={showDaily} style={{ border: "black solid 1px" }}>
            Daily Forecast
          </Button>
        </div>

        {weather && (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {weather.name}
          </h1>
        )}

        {/* CURRENT WEATHER */}
        {
          weather && tabToggle === 0 ? (
            <CurrentWeather
              tabToggle
              className="curWeather"
              // loc={weather.name}
              main={weather.weather[0].main}
              temp={weather.main.temp}
              feel={weather.main.feels_like}
              desc={weather.weather[0].description}
              hum={weather.main.humidity}
            />
          ) : null
          // <div>Invalid Zip Code</div>
        }

        {/* HOURLY WEATHER */}
        {hourly &&
          tabToggle === 1 &&
          hourly.hourly.map((h) => (
            <HourlyWeather
              temp={h.temp}
              feel={h.feels_like}
              main={h.weather[0].main}
              time={h.dt}
            />
          ))}

        {/* DAILY WEATHER */}
        {daily &&
          tabToggle == 2 &&
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

        {/* <pre>{JSON.stringify(weather, undefined, 4)}</pre> */}
        {/* <pre>{JSON.stringify(hourly.hourly, undefined, 4)}</pre> */}
        {/* <pre>{JSON.stringify(daily.daily, undefined, 4)}</pre> */}
      </div>

      {/* MAPBOX */}

      {/* <div
        style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
      >
        <div
          style={{ width: "30vw", height: "30vh", border: "solid 2px black" }}
        >
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_API_KEY}
          mapStyle="mapbox://styles/cpn1/cko4ramgv1hzh17mqdhtm19bq"
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
          >
        </ReactMapGL>
          </div>
      </div> */}
    </div>
  );
}

export default App;
