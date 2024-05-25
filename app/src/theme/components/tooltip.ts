import { mode } from "@chakra-ui/theme-tools";
import { ComponentStyleConfig, theme as baseTheme } from "@chakra-ui/react";


const Tooltip: ComponentStyleConfig = {
  baseStyle: (props) => ({
    
    color: mode('white', 'white')(props),
    bg: mode('black', 'black')(props),
    arrow: {
      bg: mode('black', 'black')(props),
    }
    
  }),
}

export default Tooltip;