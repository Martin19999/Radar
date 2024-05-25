import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


const CloseButton: ComponentStyleConfig = {
  
  baseStyle: (props) => ({
    position: "absolute",
    right: 4,
    top: 4,
    fontSize: ["sm","md"], 
  }),
  variants: {
    userinfoCloseButton: {
      right: {base: 0, sm: 2, md: 4},
      top: {base: 0, sm: 2, md: 4},
    }
    
  },
}

export default CloseButton;