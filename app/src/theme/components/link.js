import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const Link = {
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