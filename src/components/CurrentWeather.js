import "./display-styles.css";
// import "../App.css";
import React, { useState, useEffect } from "react";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CloudIcon from "@material-ui/icons/Cloud";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
const CurrentWeather = ({ main, temp, feel, desc, hum }) => {
  const [icon, setIcon] = useState("");

  useEffect(() => {
    switch (main) {
      case "Clear":
        setIcon(<WbSunnyIcon style={{ color: "orange" }} />);
        break;
      case "Clouds":
        setIcon(<CloudIcon style={{ color: "grey" }} />);
        break;
      case "Rain":
        setIcon(<InvertColorsIcon style={{ color: "blue" }} />);
        break;
      default:
    }
  }, [main]);

  return (
    <div className="current-weather-container">
      <div className="current-weather-display">
        <div className="current-description">
          {/* DESCRIPTION */}
          <p style={{ color: "grey" }}>{desc.toUpperCase()}</p>
          <p>{icon}</p>
        </div>
        <div className="temperature">
          <p style={{ color: "grey" }}>TEMPERATURE </p>
          <h3>{temp}ºC</h3>
        </div>
        <div className="feels-like">
          <p style={{ color: "grey" }}>FEELS LIKE </p>
          <p>{feel}ºC</p>
        </div>
        <div className="humidity">
          <p style={{ color: "grey" }}>HUMIDITY </p>
          <p>{hum}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
