import React, { useState, useEffect } from "react";
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
    <div
      className="days"
      style={{
        display: "flex",
        flexDirection: "row",
        // background:"black"
        justifyContent: "center",
        // alignItems: "center",
        padding: "2px",
      }}
    >
      <div
        className="dayCard"
        style={{
          background: "white",
          borderRadius: "10px",
          border: "black solid 1px",
          // width: "200px",
          width: "500px",
          padding: "5px",
          display: "flex",
          flexDirection: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h2>{icon}</h2>
        <p>{day}</p>
        <p>
          <Brightness5Icon /> {dayTemp}
        </p>
        <p>
          <ArrowDownwardIcon /> {minTemp}
        </p>
        <p>
          <ArrowUpwardIcon /> {maxTemp}
        </p>
        <p>
          <Brightness3Icon /> {nightTemp}
        </p>
      </div>
    </div>
  );
};

export default DailyWeather;
