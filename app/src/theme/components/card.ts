import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme, ComponentStyleConfig, ComponentMultiStyleConfig } from "@chakra-ui/react";


const Card: ComponentMultiStyleConfig = {
  parts: ['container', 'body'],
  variants: {
    outline: (props) => ({ 
      container: {
        marginTop: '0px',
        borderWidth: '0',
        // borderRadius: '0',
        px: '5',  
        py: '3',
        flexDirection:'row',  
        overflow: 'hidden',
        bg: 'none'
      },   
    }),
    postView: (props) => ({ 
     
      container: {  
        
        borderWidth: '0',
        borderRadius: '0',
        borderColor: mode('gray.100', 'gray.700')(props),
        px: '5',  
        py: '3',
        flexDirection:'row',  
        overflow: 'hidden',
        bg: 'none'
      }
    })
  },
}

export default Card;