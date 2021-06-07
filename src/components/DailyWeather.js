import React, { useState, useEffect } from "react";
import "./display-styles.css";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CloudIcon from "@material-ui/icons/Cloud";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import getDay from "../functions/day";

const DailyWeather = ({ main, time, dayTemp, minTemp, maxTemp, nightTemp }) => {
  const day = getDay(time);

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
    <div className="daily-weather-container">
      <div className="daily-weather-display">
        <p style={{ fontSize: "2vh" }}>{day}</p>
        <div className="conditions">
          <p style={{ color: "grey" }}>{main.toUpperCase()}</p>
          <h2 style={{ fontSize: "2vh" }}>{icon}</h2>
        </div>
        <div className="day-temp">
          {/* <p style={{ color: "grey" }}>DAY TEMP</p> */}
          <p>
            <Brightness5Icon />
          </p>
          <p>{dayTemp}</p>
        </div>

        <div className="min-temp">
          {/* <p style={{ color: "grey" }}>MIN TEMP</p> */}
          <p>
            <ArrowDownwardIcon />
          </p>
          <p>{minTemp}</p>
        </div>

        <div className="max-temp">
          {/* <p style={{ color: "grey" }}>MAX TEMP</p> */}
          <p>
            <ArrowUpwardIcon />
          </p>
          <p>{maxTemp}</p>
        </div>

        <div className="night-temp">
          {/* <p style={{ color: "grey" }}>NIGHT TEMP</p> */}
          <p>
            <Brightness3Icon />
          </p>
          <p>{nightTemp}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyWeather;
