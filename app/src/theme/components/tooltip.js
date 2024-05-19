import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const Tooltip = {
  baseStyle: (props) => ({
    
    color: mode('white', 'white')(props),
    bg: mode('black', 'black')(props),
    arrow: {
      bg: mode('black', 'black')(props),
    }
    
  }),
}

export default Tooltip;