import { mode } from "@chakra-ui/theme-tools";
import { ComponentStyleConfig, theme as baseTheme } from "@chakra-ui/react";


const FormLabel: ComponentStyleConfig = {
  baseStyle: (props) => ({
    fontSize: ["sm","md"], 
  }),
  variants: {
    showLongTextLabel: (props) => ({
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "block",
      cursor: "pointer",
    }),
  }
  
}

export default FormLabel;