import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({  
    body: {
      bg: mode("gray.100", "gray.800")(props),
      color: mode("black", "white")(props),
    },
    
    "p, a, span, div, input": {
      fontSize: ["sm","md"], 
    }
  }) 
}

export default styles;