import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme, ComponentStyleConfig, ComponentMultiStyleConfig } from "@chakra-ui/react";


const Card: ComponentMultiStyleConfig = {
  parts: ['container'],
  variants: {
    outline: (props) => ({ 
      container: {
        borderWidth: '0 0 1px 0',
        px: '5',  
        py: '3',
        flexDirection:'row',  
        overflow: 'hidden',
        bg: 'none'
      },   
    }),
  },
}

export default Card;