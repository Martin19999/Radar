import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const FormLabel = {
  variants: {
    showLongTextLabel: (props) => ({
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "block",
      cursor: "pointer"
    }),
  }
  
}

export default FormLabel;