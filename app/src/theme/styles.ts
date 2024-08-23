import { mode, Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: (props) => ({  
    body: {
      bg: mode('white', 'black')(props),
      color: mode('black', 'white')(props),
    },
    
    'p, a, span, div, input, button, label': {
      fontSize: ['sm', 'md'], 
    },

    'h2, h3, h4': {
      fontSize: ['md', 'lg'], 
    },

    'h1': {
      fontSize: ['lg', 'xl'],
    },

    '.profile-setting-options-container .setting-card img, .profile-pic, .userinfo-profile-pic': {
      border: '1px transparent',
      borderStyle: 'solid',
      borderRadius: '0.5em'
    },

    '.setting-card': {
      borderColor: mode('gray.200', 'gray.700')(props)
    },

    '.form-container, aside, .userinfo-container, .settings-container, .posting-container': {
      bg: mode('white', 'gray.900')(props),
      border: '1px transparent',
      borderStyle: 'solid',
      borderRadius: '0.5em'
    },

    'aside': {
      bg: mode('gray.100', 'gray.900')(props),
    }
  }) 
}

export default styles;