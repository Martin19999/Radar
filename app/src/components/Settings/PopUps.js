import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { getAuth, signInWithEmailAndPassword, updateEmail, updatePassword, deleteUser } from "firebase/auth";

const PopUps = (props) => {
  const { currentUser, userDetails } = useAuth();
  const [promptMessage, setPromptMessage] = useState(null);

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

  const isFormValid = () => {
    return(
      (updateEmailAddrField.password.length >= 6 && updateEmailAddrField.newEmail.length > 0) ||
      (changePasswordField.oldP.length >= 6 && changePasswordField.newP.length >=6 && changePasswordField.newP === changePasswordField.confirmNewP) ||
      (deleteAccountField.password.length >=6 && deleteAccountField.typeConfirmDelete === "delete my account")
    )
  }

  function clearForm () {
    setPromptMessage("");
    setUpdateEmailAddrField({password: "",newEmail: ""});
    setChangePasswordField({oldP: "", newP: "", confirmNewP: ""});
    setDeleteAccountField({password: "", typeConfirmDelete: ""});
  }

  function verifyID (password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userDetails.email, password)
      .then((userCredential) => {
        // Signed in 
        return true;
      })
      .catch((error) => {   
        setPromptMessage(error.message);
        return false;
      });
  }

  function updateEmailAddr (password, newEmail) {
    if (verifyID(password)) {
      updateEmail(currentUser, newEmail).then(() => {
        setPromptMessage("Email updated!");
        // probably should refresh??????
      }).catch((error) => {
        setPromptMessage(error.message);
      });
    }
  }

  function changePassword (oldP, newP) {
    if (verifyID(oldP)) {
      updatePassword(currentUser, newP).then(() => {
        setPromptMessage("Update successful.");
      }).catch((error) => {
        setPromptMessage(error.message);
      });
    } 
  }


  function deleteAccount (password) {
    if (verifyID(password)) {
        deleteUser(currentUser).then(() => {
          setPromptMessage("User deleted.")
        }).catch((error) => {
          setPromptMessage(error.message);
        });
    }   
  }
  

  function openPopUp (type) {
    switch (type) {
      case "email":
        return (
          <div className='popup-inner-content'>
            <h3>Change Email</h3>
            <p>Current Email: {userDetails.email} </p>
            <form>
              <input placeholder='Current Password' 
                    value={updateEmailAddrField.password}
                    onChange={(e) => {setUpdateEmailAddrField({...updateEmailAddrField, password: e.target.value});
                                      setPromptMessage(null);}}></input>
              <input placeholder='New Email' 
                    value={updateEmailAddrField.newEmail}
                    onChange={(e) => {setUpdateEmailAddrField({...updateEmailAddrField, newEmail: e.target.value})
                                      setPromptMessage(null);}}></input>
              <p className={promptMessage ? "" : 'hidden'}>{promptMessage}</p>
              <button onClick={ (e) => {
                e.preventDefault();
                updateEmailAddr(updateEmailAddrField.password, updateEmailAddrField.newEmail) }}
                disabled={!isFormValid()}>Change Email</button>
            </form>
            
          </div>
        )
      case "password":
        return (
          <div className='popup-inner-content'>
            <h3>Change Password </h3>
            <p>A password should be at least 6 digits.</p>
            <form>
              <input placeholder='Old Password' 
                    onChange={(e) => {setChangePasswordField({...changePasswordField, oldP: e.target.value})
                                      setPromptMessage(null);}}></input>
              <input placeholder='New Password' 
                    onChange={(e) => {setChangePasswordField({...changePasswordField, newP: e.target.value})
                                      setPromptMessage(null);}}></input>
              <input placeholder='Confirm New Password' 
                    onChange={(e) => {setChangePasswordField({...changePasswordField, confirmNewP: e.target.value})
                                      setPromptMessage(null);}}></input>
              <p>{promptMessage}</p>
              <button onClick={ (e) => {
                e.preventDefault();
                changePassword(changePasswordField.oldP, changePasswordField.newP) }}
                disabled={!isFormValid()}>Change Password</button>
            </form>
          </div>
        )
      case "delete":
        return (
          <div className='popup-inner-content'>
            <h3>Delete Account </h3>
            <form>
              <input placeholder='Enter Password' 
                    onChange={(e) => {setDeleteAccountField({...deleteAccountField, password: e.target.value})
                                      setPromptMessage(null);}}></input>
              <label>Please enter "delete my account" to confirm:</label>
              <input onChange={(e) => {setDeleteAccountField({...deleteAccountField, typeConfirmDelete: e.target.value})
                                      setPromptMessage(null);}}></input>
              <p>{promptMessage}</p>
              <button onClick={ (e) => {
                e.preventDefault();
                deleteAccount(deleteAccountField.password) }}
                disabled={!isFormValid()}>Confirm</button>
            </form>
          </div>
        )
      default: return "";
    }
  }


  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-button' onClick={ ()=> { props.setTrigger(false);
                                                          clearForm(); }}>x</button>
        {/* childern */}

        { openPopUp(props.type) }
      </div>
    </div>
  ) : "";
}

export default PopUps;