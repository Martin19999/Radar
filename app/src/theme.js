import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },

  styles: {
    global: (props) => ({ 
      body: {
        bg: mode("gray.100", "gray.800")(props),
        color: mode("black", "white")(props),
      },
      
      "p, a, span, div, input": {
        fontSize: ["sm","md"], 
      }
    }) 
  },

  components: {
    Button: {
      baseStyle: (props) => ({
        bg: mode("gray.200", "gray.700")(props),
        color: mode("black", "white")(props),
      }),
    },
    //  other components
  },
  
});

export default theme;
