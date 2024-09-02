/**
 * Logo component
 * 
 * Displays website logo, it's also clickable, direct to homepage.
 * 
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';

const Logo: React.FC = () => {
	const navigate = useNavigate();
	const { colorMode } = useColorMode();

	return(
		<img src= { colorMode === "light" ? "/logo.png" : "/logoN.png" } 
					alt="Website Logo" 
					id="logo" 
					onClick={() => navigate('/')} />
  	
	)
};

export default Logo;