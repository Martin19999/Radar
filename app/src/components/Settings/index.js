import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SettingsContent from './SettingsContent';

const Settings = () => {

  const { settingType } = useParams();
  const navigate = useNavigate();

  return (
    <div className='settings-container'>
      <h2>Settings</h2>
      <div>
        <button onClick={ ()=> navigate('/settings/account') }>Account</button>
        <button onClick={ ()=> navigate('/settings/profile') }>Profile</button>
        <button onClick={ ()=> navigate('/settings/others') }>Others</button>
      </div>
      <div className='settings-content'>
        <SettingsContent settingType={settingType} />
      </div>
    </div>

    
  )
}

export default Settings;