/**
 * Logo component
 * 
 * Displays website logo, it's also clickable, direct to homepage.
 * 
 */

import { useNavigate } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';

const Logo = () => {
	let navigate = useNavigate();
	const { colorMode } = useColorMode();

	return(
		<div>
      	<img src= { colorMode === "light" ? "/logo.png" : "/logoN.png" } alt="Website Logo" id="logo" 
						 onClick={() => navigate('/')} />
  	</div>
	)
};

export default Logo;