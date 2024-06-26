/**
 * ProfileMgmt component
 * 
 * In Settings -> Profile Settings.
 * 
 * Only for handling profile picture viewing and change. Use the Image Cropper component.
 * 
 */

import { useAuth } from '../../context/authContext';
import { useEasyToast } from '../toast';
import React, { useState, useRef } from 'react';
import { syncUserData } from '../../utils/syncUserData';
import { updateProfile } from 'firebase/auth';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ImageCropper from '../ImageCropper/imageCropper';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader, ModalFooter } from '@chakra-ui/react';
import { Button, VisuallyHiddenInput } from '@chakra-ui/react'
import { FaCamera } from "react-icons/fa";

import "../../styles/common.css";
import "../../styles/settings.css";

const ProfileMgmt = () => {
  const { currentUser, userDetails, setUserDetails } = useAuth();
  const { showSuccess, showError, showErrorNonFirebase } = useEasyToast();

  const [pfpMagnified, setPfpMagnified] = useState(false);

  const [changePfpModalOpen, setChangePfpModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null); // the selected picture's URL from local computer
  let cropFunction: (() => Promise<void>) | null = null;
  const [cropped, setCropped] = useState(false);
  const [pfp, setPfp] = useState<Blob | null>(null); // the final cropped image file

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileInputClick = () => {
    fileInputRef.current!.click(); 
  };

  const handleImageCropped = (croppedImage: Blob) => {
    // console.log('Cropped Image:', croppedImage);
    setPfp(croppedImage);
  };  

  const handlePfpChange = () => {
    if (pfp) {
      const imageRef = ref(storage, `pfp-${currentUser!.uid}`);
      uploadBytes(imageRef, pfp).then(()=>{
        getDownloadURL(imageRef)
        .then((url)=>{
          // First, update the profile in Firebase Authentication
          updateProfile(currentUser!, {
            photoURL: url
          })
          .then(() => {
            // Then update local state if updateProfile is successful
            setUserDetails({
              ...userDetails,
              photoURL: url
            });
            syncUserData({
              uid: currentUser!.uid,
              displayName: userDetails.displayName!,
              photoURL: url,
              isActive: true
            });
            showSuccess('Profile picture updated!');
          })
          .catch((error)=>{
            showError("Failed to update profile: " + error.message);
          });
          setPfp(null);  // remember to sycn with the webpage!!!! state???
          setImageSrc(null);
        }).catch((error) => {
          showErrorNonFirebase("Failed to retrieve download URL: " + error.message);
        });
      })
      .catch((error)=>{
        showErrorNonFirebase("Failed to upload image: " + error.message);
      });
    }
  }

  return (
    <>
      <Modal isOpen={pfpMagnified} onClose={()=> setPfpMagnified(false)} variant='displayPfp'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <img id='magnified-pfp' src={userDetails.photoURL!} alt="profile picture"></img>
          </ModalBody>
        </ModalContent>
      </Modal>

      <img src={userDetails.photoURL!} onClick={()=> setPfpMagnified(true)} alt="profile pic"></img>

      <div className='setting-card-content' id='upload-pfp-button'>
        <VisuallyHiddenInput type='file'
                accept='image/*' 
                onChange={ (e)=>{ //console.log(e.target.files);
                                if(e.target.files?.length === 1 && e.target.files[0].type.startsWith('image/')) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    if (typeof reader.result === 'string') setImageSrc(reader.result);
                                  };
                                  reader.readAsDataURL(e.target.files[0]);
                                  setChangePfpModalOpen(true);
                                } 
                                e.target.value = "";
                        }}
                ref={fileInputRef} 
                data-cy="profilesettings-changepfp-input" />                            
        <Button leftIcon={<FaCamera />}
                aria-label="Upload file"
                onClick={handleFileInputClick}
                data-cy='profilesettings-changepfp-edit'> Edit </Button>
        <Modal isOpen={changePfpModalOpen} onClose={()=>{setChangePfpModalOpen(false)}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crop Image</ModalHeader>
            <ModalCloseButton onClick={()=>{setCropped(false);}}/>
            <ModalBody>
              {imageSrc && <ImageCropper imageSrc={imageSrc} 
                                        onImageCropped={handleImageCropped} 
                                        onCropComplete={(fn) => { cropFunction = fn; }} 
                                        setCropped={setCropped}/>}
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => {cropFunction && cropFunction(); setCropped(true)}} 
                      isDisabled={cropped} 
                      data-cy='profilesettings-changepfp-crop'>Crop</Button>
              <Button onClick={ ()=>{ setChangePfpModalOpen(false); 
                                      setCropped(false);
                                      handlePfpChange(); }}
                      isDisabled={!cropped}
                      variant='smallFormSubmitButton'
                      data-cy='profilesettings-changepfp-save'> Save </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default ProfileMgmt;