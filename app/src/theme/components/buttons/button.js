import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const Button = {
  baseStyle: (props) => ({
    bg: mode("gray.200", "gray.700")(props),
    color: mode("black", "white")(props),
  }),
  variants: {
    bigFormSubmitButton: (props) => ({
      ...baseTheme.components.Button.variants.outline(props),
      mt: 10
    }),
    smallFormSubmitButton: (props) => ({
      ...baseTheme.components.Button.variants.outline(props),
      my: 3,
      mr: 3,
      _hover: {
        bg: 'blue.300',
      },
    }),
    menuButton: (props) => ({
      ...baseTheme.components.Button.variants.outline(props),
      display: 'flex',
      border: 'none',
      backgroundSize: 'cover',
      _hover: {
        filter: 'brightness(1.2)',
      },
      _active: {
        filter: 'brightness(1.2)',
      },
    }),
    
  },
}

export default Button;