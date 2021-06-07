import "../forms.css";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const CityForm = ({ setCity }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setCity(text);
      setText("");
    }
  };

  return (
    <form className="city-form" onSubmit={onSubmit}>
      <TextField
        // className="city-input"
        style={{ paddingRight: "10px" }}
        label="Enter city"
        value={text}
        placeholder="e.g. Charlottesville"
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        style={{ background: "rgb(23, 35, 91)", color: "white" }}
        onClick={onSubmit}
      >
        Search by City
      </Button>
    </form>
  );
};

export default CityForm;
