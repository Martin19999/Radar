import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#f3dfc1",
      },
      html: {
        bg: "#f3dfc1",
      },
      "h1, h2, h3, h4, h5, h6, p, a, span, div, input": {
        fontSize: ["sm","md"], // Responsive font sizes
      },
    },
  },
  
  colors: {
    black: "#000000", // Set black color
  },
});

export default theme;
