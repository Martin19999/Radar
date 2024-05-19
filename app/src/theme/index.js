import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import styles from "./styles";
import Button from "./components/button";
import CloseButton from "./components/closeButton";
import Form from "./components/form";
import FormLabel from "./components/formLabel";
import Switch from "./components/switch";
import Link from "./components/link";
import Tabs from "./components/Tabs";
import Modal from "./components/modal";
import Input from "./components/input";
import Menu from "./components/menu";
import Tooltip from "./components/tooltip";



const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
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
    Modal,
    Input,
    Menu,
    Tooltip
  },
  
};

export default extendTheme(theme);
