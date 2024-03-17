// customTheme.js

import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Your primary color
    },
    secondary: {
      main: "#000000", // Your secondary color
    },
    // You can define more palette options here such as error, warning, etc.
  },
});

export default customTheme;
