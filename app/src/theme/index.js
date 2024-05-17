import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import styles from "./styles";
import Button from "./components/buttons/button";
import CloseButton from "./components/buttons/closeButton";
import Form from "./components/form/form";
import FormLabel from "./components/form/formLabel";
import Switch from "./components/switch";
import Link from "./components/link";
import Tabs from "./components/Tabs";
import Modal from "./components/modal";


const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },

  styles,

  components: {
    Button,
    CloseButton,
    Form,
    FormLabel,
    Switch,
    Link,
    Tabs,
    Modal
  },
  
};

export default extendTheme(theme);
