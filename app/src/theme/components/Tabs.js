import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const Tabs = {
  baseStyle: (props) => ({
    tab: {
      minW: '100px',
      fontSize: ["sm","md"],
      '&&': {
        color: 'gray',
        marginBottom: 0,
      },
      fontWeight: 'bold',
      

      _selected: {
        color: mode('black', 'white')(props),
        fontWeight: 'bold',
        '&&': {
          borderColor: mode('#F56565', 'white')(props),
          borderBottomWidth: '2.5px',
        }
        
      },  
    },
    tablist: {
      '&&': {
        borderBottom: '1px solid',
        borderColor: mode('gray.200', 'gray.700')(props),
      },

      
    },
    tabpanel: {
      p: 0
    },
  }),
}

export default Tabs;