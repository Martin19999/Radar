import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import PopUps from './PopUps';
import { updateProfile } from 'firebase/auth';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


const SettingsContent = ({settingType}) => {
  const { currentUser, userDetails, setUserDetails } = useAuth();
  const [popUp, setPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");

  const [myDisplayName, setMyDisplayName] = useState(userDetails.displayName);
  const [nameMsg, setNameMsg] = useState("");
 
  const [pfp, setPfp] = useState(null);
  const [url, setUrl] = useState(null);
  const [pfpMagnified, setPfpMagnified] = useState(false);
  const [pfpMsg, setPfpMsg] = useState("");

  const handlePfpChange = () => {
    if (pfp) {
      const imageRef = ref(storage, `pfp-${currentUser.uid}`);
      uploadBytes(imageRef, pfp).then(()=>{
        getDownloadURL(imageRef)
        .then((url)=>{
          setUrl(url);
          // First, update the profile in Firebase Authentication
          updateProfile(currentUser, {
            photoURL: url
          })
          .then(() => {
            // Then update local state if updateProfile is successful
            setPfpMsg("Profile picture updated!");
            setUserDetails({
              ...userDetails,
              photoURL: url
            });
          })
          .catch((error)=>{
            setPfpMsg("Failed to update profile: " + error.message);
          });
          setPfp(null);  // remember to sycn with the webpage!!!! state???
        }).catch((error) => {
          setPfpMsg("Failed to retrieve download URL: " + error.message);
        });
      })
      .catch((error)=>{
        setPfpMsg("Failed to upload image: " + error.message);
      });
    }
    
  }

  function changeDisplayName (newName) {
    updateProfile(currentUser, {
      displayName: newName
    }).then(() => {
      setNameMsg("Name updated!");
      setUserDetails({
        ...userDetails,
        displayName: newName
      });
    }).catch((error) => {
      // An error occurred
      setNameMsg(error.message);
    });
  }

  const isFormValid = () => {
    // return true;
    return myDisplayName.length > 0;
  };


  switch(settingType) {
    case "account":
      return (
        <>
          <PopUps trigger={popUp} setTrigger={setPopUp} type={popUpType} />  
          <div className='account-setting-options-container'>
            <div className='setting-card'>
              <h4>Change Email</h4>
              <button onClick={ () => { setPopUp(true); setPopUpType("email"); }}><FontAwesomeIcon icon={faArrowRight} /></button>   
            </div>
            <div className='setting-card'> 
              <h4>Change Password </h4>
              <button onClick={ () => { setPopUp(true); setPopUpType("password"); }}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
            <div className='setting-card'>
              <h4>Delete Account</h4>
              <button onClick={ () => { setPopUp(true); setPopUpType("delete"); }}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
          </div>
        </>
      )
    case "profile":
      return (
        <div className='profile-setting-options-container'>
          <div className='setting-card'>
            <div className={pfpMagnified ? 'pfp-magnifier' : 'do-not-display'}>
              <button onClick={()=> setPfpMagnified(false)}>x</button>
              <img src={userDetails.photoURL} alt="profile pic"></img>
            </div>
            <img src={userDetails.photoURL} onClick={()=> setPfpMagnified(true)} alt="profile pic"></img>
            <div id='update-photo-buttons'>
              <input type='file'
                    accept='image/*' 
                    onChange={ (e)=>{
                      console.log(e.target.files);
                      if(e.target.files.length === 1 && e.target.files[0].type.startsWith('image/')) setPfp(e.target.files[0]); 
                    }}></input>
              <button onClick={ handlePfpChange } disabled={!pfp}>Change Profile</button>
            </div>
            
          </div>
          <div className='setting-card'>
            <h4>Display Name</h4>
            <div className='setting-card-content'>
              <input value={myDisplayName} onChange={ (e)=>{setMyDisplayName(e.target.value)}} maxLength={25} ></input>
              <button onClick={ () => {changeDisplayName(myDisplayName)}} 
                      disabled={!isFormValid() || myDisplayName === currentUser.displayName}>Save</button>
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