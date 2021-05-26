import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const ZipForm = ({ setZipCode }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setZipCode(text);
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
        className="zipInput"
        label="Enter zip code"
        value={text}
        placeholder="e.g. 22903"
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={onSubmit}>Search by Zip Code</Button>
    </form>
  );
};

export default ZipForm;
