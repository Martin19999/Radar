/**
 * Settings component
 * 
 * Manages what type of setting (tab) does the user clicked on.
 * 
 */

import React from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import SettingsContent from './SettingsContent';
import { Tabs, TabList, TabPanels, Tab, TabPanel, CloseButton, Link } from '@chakra-ui/react'

import "../../styles/common.css";
import "../../styles/settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabNames = ['account', 'profile', 'others'];
  const tabIndex = tabNames.indexOf(location.pathname.split("/").pop()) || 0;
  const handleTabsChange = index => {
    navigate(`/${location.pathname.split("/")[1]}/${tabNames[index]}`);
  };

  return (
    <div className='settings-container'>
      <Link as={RouterLink} to='/'><CloseButton sx={{position:'absolute', right:'4', top: '4'}} /></Link>
      <h1>Settings</h1>
      <div className='settings-content'>  
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab>Account</Tab>
            <Tab>Profile</Tab>
            <Tab>Others</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <SettingsContent settingType='account' />
            </TabPanel>
            <TabPanel p={0}>
              <SettingsContent settingType='profile' />
            </TabPanel>
            <TabPanel p={0}>
              <SettingsContent settingType='others' />
            </TabPanel>
          </TabPanels>
        </Tabs>     
      </div>
    </div>
  )
}

export default Settings;