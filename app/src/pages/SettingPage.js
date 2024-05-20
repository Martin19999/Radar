/**
 * SettingPage.js
 * 
 * User settings.
 * 
 */

import Page from "../components/page.js";
import SettingsContent from "../components/Settings/SettingsContent.js";
import React from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, CloseButton, Link } from '@chakra-ui/react'

import "../styles/common.css";
import "../styles/settings.css";

const SettingPage = () => {
	const navigate = useNavigate();
  const location = useLocation();
  const tabNames = ['account', 'profile', 'others'];
  const tabIndex = tabNames.indexOf(location.pathname.split("/").pop()) || 0;
  const handleTabsChange = index => {
    navigate(`/${location.pathname.split("/")[1]}/${tabNames[index]}`);
  };

	return(
		<Page>
			<div className='settings-container'>
				<Link as={RouterLink} to='/'><CloseButton/></Link>
				<h1>Settings</h1>
				<div className='settings-content'>  
					<Tabs index={tabIndex} onChange={handleTabsChange}>
						<TabList>
							<Tab>Account</Tab>
							<Tab>Profile</Tab>
							<Tab>Others</Tab>
						</TabList>

						<TabPanels>
							<TabPanel >
								<SettingsContent settingType='account' />
							</TabPanel>
							<TabPanel>
								<SettingsContent settingType='profile' />
							</TabPanel>
							<TabPanel>
								<SettingsContent settingType='others' />
							</TabPanel>
						</TabPanels>
					</Tabs>     
				</div>
			</div>
		</Page>
	);
}

export default SettingPage;