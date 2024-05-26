/**
 * PopUps component
 * 
 * Mainly for Settings -> Account Settings. 
 * When user choose a specific setting, a pop up form displays. 
 * 
 * Can handle: update email, change password, delete account.
 * 
 */

import { AuthContextType, useAuth } from '../../context/authContext';
import { useEasyToast } from '../toast';
import { syncUserData } from '../../utils/syncUserData';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, updateEmail, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, VisuallyHidden, InputGroup, InputRightElement, IconButton, Tooltip, Center } from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import "../../styles/common.css";
import "../../styles/settings.css";

interface PopUpsProps {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  type: string;  
}

interface UpdateEmailAddrFieldState {
  password: string;
  newEmail: string;
}

interface ChangePasswordFieldState {
  oldP: string;
  newP: string;
  confirmNewP: string;
}

interface DeleteAccountFieldState {
  password: string;
  typeConfirmDelete: string;
}

interface ShowPasswordState {
  showPassword1: boolean;
  showPassword21: boolean;
  showPassword22: boolean;
  showPassword23: boolean;
  showPassword3: boolean;
}

const PopUps: React.FC<PopUpsProps> = (props) => {
  const { currentUser, userDetails, setUserDetails } = useAuth() as AuthContextType;;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useEasyToast();
  const navigate = useNavigate();

  const [updateEmailAddrField, setUpdateEmailAddrField] = useState<UpdateEmailAddrFieldState>({ password: "", newEmail: "" });
  const [changePasswordField, setChangePasswordField] = useState<ChangePasswordFieldState>({ oldP: "", newP: "", confirmNewP: "" });
  const [deleteAccountField, setDeleteAccountField] = useState<DeleteAccountFieldState>({ password: "", typeConfirmDelete: "" });
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    showPassword1: false,
    showPassword21: false,
    showPassword22: false,
    showPassword23: false,
    showPassword3: false
  });

  const isFormValid = () => {
    return(
      ((updateEmailAddrField.password?.replace(/\s/g, "") ?? "").length >= 6 && (updateEmailAddrField.newEmail?.replace(/\s/g, "") ?? "").length > 0 && (updateEmailAddrField.newEmail?.replace(/\s/g, "") ?? "") !== userDetails.email) ||
      ((changePasswordField.oldP?.replace(/\s/g, "")?? "").length >= 6 && (changePasswordField.newP?.replace(/\s/g, "")?? "").length >=6 && changePasswordField.newP === changePasswordField.confirmNewP && changePasswordField.newP !== changePasswordField.oldP)||
      ((deleteAccountField.password?.replace(/\s/g, "")?? "").length >=6 && (deleteAccountField.typeConfirmDelete ?? "") === "delete my account")
    )
  }

  function clearForm () {
    setUpdateEmailAddrField({password: "", newEmail: ""});
    setChangePasswordField({oldP: "", newP: "", confirmNewP: ""});
    setDeleteAccountField({password: "", typeConfirmDelete: ""});
    setShowPassword({showPassword1: false, showPassword21: false, showPassword22: false, showPassword23: false, showPassword3: false});
  }

  async function verifyID(password: string): Promise<boolean> {
    setIsSubmitting(true);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, userDetails.email!, password);
      return true;
    } catch (error) {
      showError((error as Error).message);
      return false;
    }
  }

  async function updateEmailAddr(password: string, newEmail: string): Promise<void> {
    const verified = await verifyID(password);
    if (verified) {
      try {
        const credential = EmailAuthProvider.credential(currentUser!.email!, password);
        await reauthenticateWithCredential(currentUser!, credential);
        await updateEmail(currentUser!, newEmail);
        setUserDetails({
          ...userDetails,
          email: newEmail
        });
        showSuccess("Email updated!");
      } catch (error) {
        showError((error as Error).message);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  async function changePassword(oldP: string, newP: string): Promise<void> {
    const verified = await verifyID(oldP);
    if (verified) {
      try {
        const credential = EmailAuthProvider.credential(currentUser!.email!, oldP);
        await reauthenticateWithCredential(currentUser!, credential);
        await updatePassword(currentUser!, newP);
        showSuccess("Password updated!");
      } catch (error) {
        showError((error as Error).message); 
      } finally {
        clearForm();  
        setIsSubmitting(false);
      }
    }
  }

  async function deleteAccount(password: string): Promise<void> {
    const verified = await verifyID(password);
    if (verified) {
      try {
        const credential = EmailAuthProvider.credential(currentUser!.email!, password);
        await reauthenticateWithCredential(currentUser!, credential);

        await syncUserData({
          uid: currentUser!.uid,
          displayName: userDetails.displayName!,
          photoURL: userDetails.photoURL!,
          isActive: false
        });

        await deleteUser(currentUser!);
        showSuccess("User deleted.");
        setUserDetails({
          displayName: "", 
          email: "", 
          photoURL: "", 
          creationTime: ""
        });
        navigate('/');
      } catch (error) {
        showError((error as Error).message); 
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  const changeEmailButtonRef = useRef<HTMLButtonElement | null>(null);
  const changePasswordButtonRef = useRef<HTMLButtonElement | null>(null);
  const deleteAccountButtonRef = useRef<HTMLButtonElement | null>(null);
  const chooseButton = (type: string) => {
    switch(type){
      case "Change Email":
        // console.log(changeEmailButtonRef)
        changeEmailButtonRef.current!.click();
        break;
      case "Change Password":
        changePasswordButtonRef.current!.click();
        break;
      case "Delete Account":
        deleteAccountButtonRef.current!.click();
        break;
      default:
        break;
    }
  }

  function openPopUp (type: string) {
    switch (type) {
      case "Change Email":
        return (
          <div className='popup-inner-content'>
            <Tooltip label={userDetails.email} aria-label="Full email">
              <FormLabel variant='showLongTextLabel' data-cy='email-label'>Current Email: {userDetails.email}</FormLabel>
            </Tooltip>
            <form>
              <FormControl isRequired>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='Current Password'
                          type={showPassword.showPassword1 ? 'text' : 'password'} 
                          onChange={(e) => {setUpdateEmailAddrField({...updateEmailAddrField, password: e.target.value})} } 
                          data-cy='changeemail-password'/>
                  <InputRightElement>
                    <Button as={IconButton} icon={showPassword.showPassword1 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword1: !showPassword.showPassword1})}}/>
                  </InputRightElement>
                </InputGroup>    
              </FormControl>
              <FormControl isRequired>
                <FormLabel>New Email:</FormLabel>
                <Input placeholder='New Email' 
                       onChange={(e) => {setUpdateEmailAddrField({...updateEmailAddrField, newEmail: e.target.value})} } 
                       data-cy='changeemail-newemail'/>
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
              <FormControl isRequired>
                <FormLabel>Old Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='Old Password'
                        type={showPassword.showPassword21 ? 'text' : 'password'} 
                        onChange={(e) => {setChangePasswordField({...changePasswordField, oldP: e.target.value})} }
                        value={changePasswordField.oldP}
                        data-cy='changepassword-oldpassword' />
                  <InputRightElement>
                    <Button as={IconButton} icon={showPassword.showPassword21 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword21: !showPassword.showPassword21})}}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>New Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='New Password'
                        type={showPassword.showPassword22 ? 'text' : 'password'} 
                        onChange={(e) => {setChangePasswordField({...changePasswordField, newP: e.target.value});} } 
                        value={changePasswordField.newP}
                        data-cy='changepassword-newpassword'/>
                  <InputRightElement>
                    <Button as={IconButton} icon={showPassword.showPassword22 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword22: !showPassword.showPassword22})}}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm New Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='Confirm New Password'
                        type={showPassword.showPassword23 ? 'text' : 'password'} 
                        onChange={(e) => {setChangePasswordField({...changePasswordField, confirmNewP: e.target.value})} } 
                        value={changePasswordField.confirmNewP}
                        data-cy='changepassword-confirmnewpassword'/>
                  <InputRightElement>
                    <Button as={IconButton} icon={showPassword.showPassword23 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" 
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
              <FormControl isRequired>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                  <Input placeholder='Enter Password'
                         type={showPassword.showPassword3 ? 'text' : 'password'} 
                         onChange={(e) => {setDeleteAccountField({...deleteAccountField, password: e.target.value})} } 
                         data-cy='deleteaccount-password'/>
                  <InputRightElement>
                    <Button as={IconButton} icon={showPassword.showPassword3 ? <IoMdEye/> :<IoMdEyeOff/>} variant="unstyled" 
                            onClick={()=>{ setShowPassword({...showPassword, showPassword3: !showPassword.showPassword3})}}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Please enter "delete my account" to confirm:</FormLabel>
                <Input onChange={(e) => {setDeleteAccountField({...deleteAccountField, typeConfirmDelete: e.target.value})} } 
                       data-cy='deleteaccount-confirmphrase'/>
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
          <ModalHeader>{ props.type }</ModalHeader>
          <ModalCloseButton data-cy='accountsettings-popupclose'/>
          <ModalBody>
            { openPopUp(props.type) }
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>chooseButton(props.type)} 
                    isDisabled={!isFormValid() || isSubmitting } 
                    isLoading={isSubmitting} 
                    variant='smallFormSubmitButton'
                    data-cy='accountsettings-submit'>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  
  ) : "";
}

export default PopUps;