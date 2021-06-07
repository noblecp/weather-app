import "./display-styles.css";
import React, { useState, useEffect } from "react";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CloudIcon from "@material-ui/icons/Cloud";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import getHour from "../functions/hour";

const HourlyWeather = ({ time, main, temp, feel, hum }) => {
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

  const t = getHour(time);

  return (
    <div className="hourly-weather-container">
      <div className="hourly-weather-display">
        {/* time */}
        <p style={{ fontSize: "3vh" }}>{t}</p>
        {/* icon */}
        <div className="conditions">
          <p style={{ color: "grey" }}>{main.toUpperCase()}</p>
          <p style={{ fontSize: "3vh" }}>{icon}</p>
        </div>
        {/* temperature */}
        <div className="temperature">
          <p style={{ color: "grey" }}>TEMPERATURE</p>
          <h3>{temp}ºC </h3>
        </div>
        {/* feels like */}
        <div className="feels-like">
          <p style={{ color: "grey" }}>FEELS LIKE</p>
          <p> {feel} ºC</p>
        </div>
        <div className="humidity">
          <p style={{ color: "grey" }}>HUMIDITY</p>
          <p>{hum}ºC </p>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
