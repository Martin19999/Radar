/**
 * Banner component
 * 
 * Consists of: Logo, search bar and menu
 * 
 */

import Logo from "./Logo.js";
import Search from "./Search.js";
import Menu from "./Menu.js";

import "../../styles/common.css";

const Banner = () => (
	<header className="page-header">
		<div className="logo-n-search-container">
			<Logo />
			<Search />
		</div>
		<Menu />
	</header>
);

export default Banner;