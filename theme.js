"use client";
import { createTheme } from "@mui/material/styles";
// const theme = createTheme({
//   // Customize your theme here
//   palette: {
//     text: {
//       primary: "#FFFFFF",
//       main: '#FFFFFF',// Set primary text color to white
//     },
//     // Other palette customizations can go here
//   },
// });
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#212121', // Background color grey 900
        },
      },
    },
  },
});

export default darkTheme;
