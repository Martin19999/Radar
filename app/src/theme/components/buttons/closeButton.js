import { mode } from "@chakra-ui/theme-tools";

const CloseButton = {
  variants: {
    settingPageCloseButton: (props) => ({
      position: "absolute",
      right: 4,
      top: 4
    }),

    userinfoPageCloseButton: (props) => ({
      position: "absolute",
      right: 0,
      top: 0
    }),

  },
}

export default CloseButton;