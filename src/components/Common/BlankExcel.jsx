import { Button } from "@mui/material";
import React from "react";

function BlankExcel() {
  const handleClick = () => {
    console.log("test");
  };
  return;
  <Button
    size="small"
    variant="contained"
    color="success"
    onClick={handleClick}
  >
    Download <br />
    Blank Template
  </Button>;
}

export default BlankExcel;
