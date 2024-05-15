/**
 * SettingsContent component
 * 
 * MAINLY for setting options [for all types of settings (tabs)] display
 * Change displayName function in "Settings -> Profile Settings" is also here.
 * 
 */

import { useAuth } from '../../context/authContext';
import React, { useState } from 'react';
import ProfileMgmt from './ProfileMgmt';
import PopUps from './PopUps';
import { useEasyToast } from '../toast';
import { updateProfile } from 'firebase/auth';
import { Button, IconButton, Input } from '@chakra-ui/react'
import { FaArrowRight } from "react-icons/fa";

import "../../styles/common.css";
import "../../styles/settings.css";

const SettingsContent = ({settingType}) => {
  const { currentUser, userDetails, setUserDetails } = useAuth();

  const [popUp, setPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  
  const [myDisplayName, setMyDisplayName] = useState(userDetails.displayName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useEasyToast();

  const isFormValid = () => {
    return (myDisplayName?.replace(/\s/g, "") ?? "").length > 0;
  };

  function changeDisplayName (newName) {
    setIsSubmitting(true);
    updateProfile(currentUser, {
      displayName: newName.replace(/\s/g, "")
    }).then(() => {
      setUserDetails({
        ...userDetails,
        displayName: newName.replace(/\s/g, "")
      });
      showSuccess("Name updated!");
    }).catch((error) => {
      showError(error.message);
    }).finally(() => {
      setIsSubmitting(false); 
    });
  }

  switch(settingType) {
    case "account":
      return (
        <>
          <PopUps trigger={popUp} setTrigger={setPopUp} type={popUpType} />  
          <div className='account-setting-options-container'>
            <div className='setting-card'>
              <h4>Change Email</h4>
              <IconButton onClick={ () => { setPopUp(true); setPopUpType("Change Email"); }} icon={<FaArrowRight />} />
            </div>
            <div className='setting-card'> 
              <h4>Change Password</h4>
              <IconButton onClick={ () => { setPopUp(true); setPopUpType("Change Password"); }} icon={<FaArrowRight />} />
            </div>
            <div className='setting-card'>
              <h4>Delete Account</h4>
              <IconButton onClick={ () => { setPopUp(true); setPopUpType("Delete Account"); }} icon={<FaArrowRight />} />
            </div>
          </div>
        </>
      )
    case "profile":
      return (
        <div className='profile-setting-options-container'>
          <div className='setting-card'>
            <ProfileMgmt />
          </div>
          <div className='setting-card'>
            <h4>Display Name</h4>
            {console.log(currentUser.displayName)}
            <div className='setting-card-content'>
              <Input value={myDisplayName?.replace(/\s/g, "")} onChange={ (e)=>{setMyDisplayName(e.target.value)}} maxLength={25} ></Input>
              <Button onClick={ () => {changeDisplayName(myDisplayName)}} 
                      isLoading={isSubmitting}
                      isDisabled={!isFormValid() || (myDisplayName?.replace(/\s/g, "") ?? "" )=== currentUser.displayName.replace(/\s/g, "") || isSubmitting}>Save</Button>
            </div>        
          </div>      
        </div>
      )
    default:
      return (
        <div className='other-setting-options-container'>
          <div className='setting-card'>Others?</div>
        </div>
      )
  } 
}

export default SettingsContent;