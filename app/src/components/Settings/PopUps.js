/**
 * PopUps component
 * 
 * Mainly for Settings -> Account Settings. 
 * When user choose a specific setting, a pop up form displays. 
 * 
 * Can handle: update email, change password, delete account.
 * 
 */

import { useAuth } from '../../context/authContext';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, updateEmail, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, VisuallyHidden, InputGroup, InputRightElement, IconButton, Tooltip } from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useEasyToast } from '../toast';

import "../../styles/common.css";
import "../../styles/settings.css";

const PopUps = (props) => {
  const { currentUser, userDetails, setUserDetails } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useEasyToast();
  const navigate = useNavigate();

  const [updateEmailAddrField, setUpdateEmailAddrField] = useState({
    password: "",
    newEmail: ""
  });

  const [changePasswordField, setChangePasswordField] = useState({
    oldP: "", 
    newP: "", 
    confirmNewP: ""
  });

  const [deleteAccountField, setDeleteAccountField] = useState({
    password: "",
    typeConfirmDelete: ""
  });

  const [showPassword, setShowPassword] = useState({
    showPassword1: false,
    showPassword21: false,
    showPassword22: false,
    showPassword23: false,
    showPassword3: false
  });

  const isFormValid = () => {
    return(
      ((updateEmailAddrField.password?.replace(/\s/g, "") ?? "").length >= 6 && (updateEmailAddrField.newEmail?.replace(/\s/g, "") ?? "").length > 0 && (updateEmailAddrField.newEmail?.replace(/\s/g, "") ?? "") !== userDetails.email) ||
      ((changePasswordField.oldP?.replace(/\s/g, "")?? "").length >= 6 && (changePasswordField.newP?.replace(/\s/g, "")?? "").length >=6 && changePasswordField.newP === changePasswordField.confirmNewP) ||
      ((deleteAccountField.password?.replace(/\s/g, "")?? "").length >=6 && (deleteAccountField.typeConfirmDelete ?? "") === "delete my account")
    )
  }

  function clearForm () {
    setUpdateEmailAddrField({password: "", newEmail: ""});
    setChangePasswordField({oldP: "", newP: "", confirmNewP: ""});
    setDeleteAccountField({password: "", typeConfirmDelete: ""});
    setShowPassword({showPassword1: false, showPassword21: false, showPassword22: false, showPassword23: false, showPassword3: false});
  }

  function verifyID (password) {
    setIsSubmitting(true);
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, userDetails.email, password)
      .then((userCredential) => {
        return true;
      })
      .catch((error) => {   
        showError(error.message);
        return false;
      });
  }

  function updateEmailAddr (password, newEmail) {
    verifyID(password).then(verified=>{
      if (verified) {
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        reauthenticateWithCredential(currentUser, credential).then(() => {
          updateEmail(currentUser, newEmail).then(() => {
            setUserDetails({
              ...userDetails,
              email: newEmail
            });
            showSuccess("Email updated!");
          }).catch((error) => {
            showError(error.message);
          });
        }).catch((error) => {
          showError(error.message);
        });
      }
    }).finally(() => {
      setIsSubmitting(false); 
    });
  }

  function changePassword (oldP, newP) {
    verifyID(oldP).then(verified=>{
      if (verified) {
        const credential = EmailAuthProvider.credential(currentUser.email, oldP);
        reauthenticateWithCredential(currentUser, credential).then(() => {
          updatePassword(currentUser, newP).then(() => {
            showSuccess("Password updated!");
          }).catch((error) => {
            showError(error.message);
          });
        }).catch((error) => {
          showError(error.message);
        });
      }
    }).finally(() => {
      setIsSubmitting(false); 
    });
  }

  function deleteAccount (password) {
    verifyID(password).then(verified=>{
      if (verified) {
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        reauthenticateWithCredential(currentUser, credential).then(() => {
          deleteUser(currentUser).then(() => {
            showSuccess("User deleted.")
            setUserDetails({
              displayName: "", 
              email: "", 
              photoURL: "", 
              creationTime: ""
            });
            navigate('/');
          }).catch((error) => {
            showError(error.message);
          });
        }).catch((error) => {
          showError(error.message);
        });
      }
    }).finally(() => {
      setIsSubmitting(false); 
    });
  }

  const changeEmailButtonRef = useRef(null);
  const changePasswordButtonRef = useRef(null);
  const deleteAccountButtonRef = useRef(null);
  const chooseButton = (type) => {
    switch(type){
      case "Change Email":
        // console.log(changeEmailButtonRef)
        changeEmailButtonRef.current.click();
        break;
      case "Change Password":
        changePasswordButtonRef.current.click();
        break;
      case "Delete Account":
        deleteAccountButtonRef.current.click();
        break;
      default:
        break;
    }
  }

  function openPopUp (type) {
    switch (type) {
      case "Change Email":
        return (
          <div className='popup-inner-content'>
            <Tooltip label={userDetails.email} aria-label="Full email">
              <FormLabel whiteSpace="nowrap"
                         overflow="hidden"
                         textOverflow="ellipsis"
                         display="block" // Ensure it behaves as a block element
                         cursor="pointer">Current Email: {userDetails.email} </FormLabel>
            </Tooltip>
            <form>
              <FormControl isRequired mt={5}>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='Current Password'
                          type={showPassword.showPassword1 ? 'text' : 'password'} 
                          onChange={(e) => {setUpdateEmailAddrField({...updateEmailAddrField, password: e.target.value})} } />
                  <InputRightElement width='2.5rem'>
                    <Button as={IconButton} icon={showPassword.showPassword1 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" h='1.75rem' size='sm' 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword1: !showPassword.showPassword1})}}/>
                  </InputRightElement>
                </InputGroup>    
              </FormControl>
              <FormControl isRequired mt={5}>
                <FormLabel>New Email:</FormLabel>
                <Input placeholder='New Email' 
                       onChange={(e) => {setUpdateEmailAddrField({...updateEmailAddrField, newEmail: e.target.value})} } />
              </FormControl>
              <VisuallyHidden>
                <button onClick={ (e) => { e.preventDefault();
                                           updateEmailAddr(updateEmailAddrField.password, updateEmailAddrField.newEmail) }}
                        ref={changeEmailButtonRef}>Change Email</button>
              </VisuallyHidden>  
            </form>           
          </div>
        )
      case "Change Password":
        return (
          <div className='popup-inner-content'>
            <FormLabel>Password must be at least 6 characters long</FormLabel>
            <form>
              <FormControl isRequired mt={5}>
                <FormLabel>Old Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='Old Password'
                        type={showPassword.showPassword21 ? 'text' : 'password'} 
                        onChange={(e) => {setChangePasswordField({...changePasswordField, oldP: e.target.value})} } />
                  <InputRightElement width='2.5rem'>
                    <Button as={IconButton} icon={showPassword.showPassword21 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" h='1.75rem' size='sm' 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword21: !showPassword.showPassword21})}}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={5}>
                <FormLabel>New Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='New Password'
                        type={showPassword.showPassword22 ? 'text' : 'password'} 
                        onChange={(e) => {setChangePasswordField({...changePasswordField, newP: e.target.value});} } />
                  <InputRightElement width='2.5rem'>
                    <Button as={IconButton} icon={showPassword.showPassword22 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" h='1.75rem' size='sm' 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword22: !showPassword.showPassword22})}}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={5}>
                <FormLabel>Confirm New Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='Confirm New Password'
                        type={showPassword.showPassword23 ? 'text' : 'password'} 
                        onChange={(e) => {setChangePasswordField({...changePasswordField, confirmNewP: e.target.value})} } />
                  <InputRightElement width='2.5rem'>
                    <Button as={IconButton} icon={showPassword.showPassword23 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" h='1.75rem' size='sm' 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword23: !showPassword.showPassword23})}}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <VisuallyHidden>
                <button onClick={ (e) => { e.preventDefault();
                                            changePassword(changePasswordField.oldP, changePasswordField.newP) }}
                        ref={changePasswordButtonRef}>Change Password</button>
              </VisuallyHidden>  
            </form>
          </div>
        )
      case "Delete Account":
        return (
          <div className='popup-inner-content'>
            <form>
              <FormControl isRequired mt={5}>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='Enter Password'
                         type={showPassword.showPassword3 ? 'text' : 'password'} 
                         onChange={(e) => {setDeleteAccountField({...deleteAccountField, password: e.target.value})} } />
                  <InputRightElement width='2.5rem'>
                    <Button as={IconButton} icon={showPassword.showPassword3 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" h='1.75rem' size='sm' 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword3: !showPassword.showPassword3})}}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={5}>
                <FormLabel>Please enter "delete my account" to confirm:</FormLabel>
                <Input onChange={(e) => {setDeleteAccountField({...deleteAccountField, typeConfirmDelete: e.target.value})} } />
              </FormControl>
              <VisuallyHidden>
                <button onClick={ (e) => { e.preventDefault();
                                           deleteAccount(deleteAccountField.password) }}
                        ref={deleteAccountButtonRef}>Change Email</button>
              </VisuallyHidden>  
            </form>          
          </div>
        )
      default: return "";
    }
  }

  return (props.trigger) ? (   
      <Modal isOpen={true} onClose={()=>{props.setTrigger(false); clearForm(); } }>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader sx={{position: 'relative'}}>{ props.type }</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            { openPopUp(props.type) }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>chooseButton(props.type)} isDisabled={!isFormValid() || isSubmitting } isLoading={isSubmitting}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  
  ) : "";
}

export default PopUps;