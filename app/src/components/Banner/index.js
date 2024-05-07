/**
 * Banner component
 * 
 * Consists of: Logo, search bar, auth (not logged in)/ user info (logged in)
 * 
 */

import Logo from "./Logo.js";
import Search from "./Search.js";
import Menu from "./Menu.js";
import "../../styles/common.css";


const Banner = () => (
	<header>
		<div className="logo-n-search-container">
			<Logo />
			<Search />
		</div>
		
		<Menu />
	</header>
);

export default Banner;