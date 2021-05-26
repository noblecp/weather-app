import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const CityForm = ({ setCity }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setCity(text);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        className="cityInput"
        label="Enter city"
        value={text}
        placeholder="e.g. Charlottesville"
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={onSubmit}>Search by City</Button>
    </form>
  );
};

export default CityForm;
