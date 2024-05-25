import { mode } from "@chakra-ui/theme-tools";
import { ComponentStyleConfig, theme as baseTheme } from "@chakra-ui/react";


const Switch: ComponentStyleConfig = {
  parts: ['container', 'track'],
  baseStyle: (props) => ({
    container: {
      ml: 4,
      fontSize: ["sm","md"], 
    },
    track: {
      _checked: {
        // bg: '#D4AF37',
      }
    },
  }),
}

export default Switch;