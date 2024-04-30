/**
 * Banner component
 * 
 * Consists of: Logo, search bar, auth (not logged in)/ user info (logged in)
 * 
 */

import Logo from "./Logo.js";
import Search from "./Search.js";
import Auth from "./Auth.js";


const Banner = () => (
	<header>
		<Logo />
		<Search />
		<Auth />
	</header>
);

export default Banner;