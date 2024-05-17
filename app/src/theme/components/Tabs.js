import { mode } from "@chakra-ui/theme-tools";
import { theme as baseTheme } from "@chakra-ui/react";


const Tabs = {
  baseStyle: (props) => ({
    tabpanel: {
      p: 0
    }
  }),
  variants: {
    enclosed: (props) => ({
      ...baseTheme.components.Tabs.variants.enclosed(props),
      tabpanel: {
        p: 0
      }
    }),
  }
}

export default Tabs;