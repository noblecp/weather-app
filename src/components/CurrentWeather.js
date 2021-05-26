import React, { useState, useEffect } from "react";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CloudIcon from "@material-ui/icons/Cloud";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
const CurrentWeather = ({ /*loc,*/ main, temp, feel, desc, hum }) => {
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="currentWeather"
        style={{
          display: "flex",
          // flexDirection: "column",
          textAlign: "center",
          justifyContent: "space-evenly",
          alignItems: "center",
          background: "white",
          borderRadius: "10px",
          border: "black solid 1px",
          width: "80%",
          padding: "10px",
        }}
      >
        <div>
          {/* LOCATION */}
          {/* <h1 style={{ marginRight: "10px" }}>{loc}</h1> */}
          {/* DESCRIPTION */}
          <p style={{ color: "grey" }}>
            {desc.toUpperCase()} {icon}
          </p>
        </div>
        {/* TEMPERATURE */}
        <h1>{temp}ºC</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "grey" }}>FEELS LIKE </p>
          <h3>{feel}ºC</h3>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "grey" }}>HUMIDITY </p>
          <h3>{hum}%</h3>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
