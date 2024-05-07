/**
 * Logo component
 * 
 * Displays website logo, it's also clickable, direct to homepage.
 * 
 */

import { useNavigate } from 'react-router-dom';

const Logo = () => {
	let navigate = useNavigate();
	return(
		<div >
      	<img src="/logo.png" alt="Website Logo" id="logo" onClick={() => navigate('/')}/>
  	</div>
	); 
};

export default Logo;