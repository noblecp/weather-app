import React, { useState, useEffect } from "react";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CloudIcon from "@material-ui/icons/Cloud";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import getHour from "../functions/hour";

const HourlyWeather = ({ temp, feel, main, time }) => {
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
    <div
      className="hours"
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
        className="hourCard"
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
        {/* time and icon */}
        <p style={{ color: "grey" }}>
          {t} {icon}
        </p>
        {/* temperature */}
        <h3>{temp} ºC </h3>
        {/* feels like */}
        <div
          style={{
            display: "flex",
            flexDirection: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "grey" }}>feels like </p>
          <p> {feel}</p>
          <p>ºC </p>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
