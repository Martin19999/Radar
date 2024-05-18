import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const Input = {
  baseStyle: (props) => ({
    
    field: {
      _focusVisible: {
        '&&': {     
          borderColor: mode('#F56565', 'blue.300')(props),
          boxShadow: mode('0 0 0 1px #F56565', '0 0 0 1px blue.300')(props),
        }
        
      }
    }
  }),
  variants: {
    searchBar: (props) => ({
      field: {
        '&&&': {
          border: '1px',
          borderColor: mode('gray.200', 'gray.700')(props),
        },
        _hover: {
          '&&': {     
            borderColor: mode('#F56565', 'blue.300')(props),
            
          }
        },
        
        _focusVisible: {
          '&&': {     
            borderColor: mode('#F56565', 'blue.300')(props),
            boxShadow: mode('-3px 3px 10px 0px #F56565', '-3px 3px 10px 0px #63B3ED')(props),
          }
          
        }
      }
    }),
  }
}

export default Input;