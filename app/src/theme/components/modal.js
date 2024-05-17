import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const Modal = {
  baseStyle: (props) => ({

  }),
  variants: {
    displayPfp: (props) => ({
      ...baseTheme.components.Modal.baseStyle,
      dialog: {
        display: 'flex',
        justify: 'center',
        h: 350,
        w: 350
      },
      body: {
        p: 0
      }
    }),
  }
}

export default Modal;