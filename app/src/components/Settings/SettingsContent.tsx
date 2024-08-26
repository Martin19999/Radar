/**
 * SettingsContent component
 * 
 * MAINLY for setting options [for all types of settings (tabs)] display
 * Change displayName function in "Settings -> Profile Settings" is also here.
 * 
 */

import { useAuth } from '../../context/authContext';
import ProfileMgmt from './ProfileMgmt';
import { syncUserData } from '../../utils/syncUserData';
import PopUps from './PopUps';
import { useEasyToast } from '../toast';
import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import DOMPurify from 'dompurify';
import { Button, IconButton, Input } from '@chakra-ui/react'
import { FaArrowRight } from "react-icons/fa";

import "../../styles/common.css";
import "../../styles/settings.css";

interface SettingsContentProps {
  settingType: string;  
}

const SettingsContent: React.FC<SettingsContentProps> = ({settingType}) => {
  const { currentUser, userDetails, setUserDetails } = useAuth();

  const [popUp, setPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  
  const [myDisplayName, setMyDisplayName] = useState(userDetails.displayName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useEasyToast();

  const isFormValid = () => {
    if ((myDisplayName?.replace(/\s/g, "") ?? "").length > 0) {
      if ((DOMPurify.sanitize(myDisplayName!.replace(/\s/g, ""))) ?? "".length > 0) {
        return true
      }
    }
    return false;
  };

  function changeDisplayName (newName: string) {
    setIsSubmitting(true);
    // console.log(DOMPurify.sanitize(newName.replace(/\s/g, "")))
    // const sanitizedDisplayName = DOMPurify.sanitize(newName.replace(/\s/g, "")).replaceAll('&lt;', '<').replaceAll('&gt;', '>');

    updateProfile(currentUser!, {
      displayName: newName
    }).then(() => {
      setUserDetails({
        ...userDetails,
        displayName: newName
      });
      showSuccess("Name updated!");
      syncUserData({
        uid: currentUser!.uid,
        displayName: newName,
				photoURL: userDetails.photoURL!,
        isActive: true
			});
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
              <IconButton onClick={() => { setPopUp(true); setPopUpType("Change Email"); } } icon={<FaArrowRight />} data-cy='settings-changeemail' aria-label={'Change Email'}/>
            </div>
            <div className='setting-card'> 
              <h4>Change Password</h4>
              <IconButton onClick={() => { setPopUp(true); setPopUpType("Change Password"); } } icon={<FaArrowRight />} data-cy='settings-changepassword' aria-label={'Change Password'}/>
            </div>
            <div className='setting-card'>
              <h4>Delete Account</h4>
              <IconButton onClick={() => { setPopUp(true); setPopUpType("Delete Account"); } } icon={<FaArrowRight />} data-cy='settings-deleteaccount' aria-label={'Delete Account'}/>
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
            <div className='setting-card-content'>
              <Input value={myDisplayName?.replace(/\s/g, "")} onChange={ (e)=>{setMyDisplayName(e.target.value)}} maxLength={25}
                     data-cy='profilesettings-changedisplayname-name' ></Input>
              <Button onClick={ () => {changeDisplayName(myDisplayName!)}} 
                      isLoading={isSubmitting}
                      isDisabled={!isFormValid() || (myDisplayName?.replace(/\s/g, "") ?? "" )=== (currentUser!.displayName?.replace(/\s/g, "") ?? "") || isSubmitting}
                      ml={10}
                      data-cy='profilesettings-changedisplayname-button'>Save</Button>
            </div>        
          </div>      
        </div>
      )
    default:
      return (
        <div className='other-setting-options-container'>
          <div className='setting-card'>:)</div>
        </div>
      )
  } 
}

export default SettingsContent;