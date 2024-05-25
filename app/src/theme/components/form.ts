import { mode } from "@chakra-ui/theme-tools";
import { ComponentMultiStyleConfig, theme as baseTheme } from "@chakra-ui/react";


const Form: ComponentMultiStyleConfig = {
  parts: ['container'],
  baseStyle: (props) => ({
    container: {
      mt: 5,
      fontSize: ["sm","md"], 
    }
  }),
}

export default Form;