import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const Modal = {
  baseStyle: (props) => ({
    fontSize: ["sm","md"], 
    dialog: {
      bg: mode('white', 'gray.800')(props),
    }
  }),
  variants: {
    displayPfp: (props) => ({
      overlay: {
        bg: "RGBA(0, 0, 0, 0.9)",
      },
      dialog: {
        display: 'flex',
        justify: 'center',
        h: 350,
        w: 350, 
        bg: 'transparent',
        
        
      },
      body: {
        p: 0,    
      }
    }),
  }
}

export default Modal;