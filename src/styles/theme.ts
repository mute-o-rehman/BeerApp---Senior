import { orange, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: teal["900"],
    },
    secondary: {
      main: orange.A700,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },

    MuiSvgIcon: {
      defaultProps: {
        htmlColor: orange.A700,
      },
    },
  },
});

export { theme };
