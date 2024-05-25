import { mode } from "@chakra-ui/theme-tools";
import { ComponentStyleConfig, theme as baseTheme } from "@chakra-ui/react";


const Link: ComponentStyleConfig = {
  baseStyle: (props) => ({
    fontSize: ["sm","md"], 
  }),
  variants: {
    textLinkInForms: (props) => ({
      mt: 5,
    }),
  }
}

export default Link;