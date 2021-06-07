import "../forms.css";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const ZipForm = ({ setZipCode, goToLocation }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setZipCode(text);
      goToLocation();
      setText("");
    }
  };

  return (
    <form className="zip-form" onSubmit={onSubmit}>
      <TextField
        // className="zip-input"
        style={{ paddingRight: "10px" }}
        label="Enter zip code"
        value={text}
        placeholder="e.g. 22903"
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        style={{ background: "rgb(208, 208, 208)", color: "white" }}
        onClick={onSubmit}
      >
        Search Zip
      </Button>
    </form>
  );
};

export default ZipForm;
