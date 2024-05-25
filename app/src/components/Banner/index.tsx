/**
 * Banner component
 * 
 * Consists of: Logo, search bar and menu
 * 
 */


import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";
import React from "react";
import "../../styles/common.css";

const Banner: React.FC = () => {
	return (
		<header className="page-header">
			<div className="logo-n-search-container">
				<Logo />
				<Search />
			</div>
			<Menu />
		</header>
	);
};

export default Banner;