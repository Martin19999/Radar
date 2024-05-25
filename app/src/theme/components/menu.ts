import { mode } from "@chakra-ui/theme-tools";
import { ComponentStyleConfig, theme as baseTheme } from "@chakra-ui/react";


const Menu: ComponentStyleConfig = {
  baseStyle: (props) => ({
    list: {
      bg: mode('white', 'black')(props),
    },
    item: {
      bg: mode('white', 'black')(props),
      _hover: {
        bg: mode('gray.100', 'gray.900')(props),
      }
    }
    
  }),
  
    
}

export default Menu;