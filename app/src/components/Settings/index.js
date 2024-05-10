import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SettingsContent from './SettingsContent';
import { useState } from 'react';


const Settings = () => {

  const { settingType } = useParams();
  const navigate = useNavigate();

  return (
    <div className='settings-container'>
      <h2>Settings</h2>
      <div className='setting-options'>  
        <button onClick={ ()=> navigate('/settings/account') } 
                className={settingType==='account' ? 'selected-button' : ''}>Account</button>
        <button onClick={ ()=> navigate('/settings/profile') }
                className={settingType==='profile' ? 'selected-button' : ''}>Profile</button>
        <button onClick={ ()=> navigate('/settings/others') }
                className={settingType==='others' ? 'selected-button' : ''}>Others</button>
      </div>
      <div className='settings-content'>
        <SettingsContent settingType={settingType} />
      </div>
    </div>

    
  )
}

export default Settings;