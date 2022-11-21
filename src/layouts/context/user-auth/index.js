import { createContext, useContext, useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber,signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut, } from "firebase/auth";
import { auth } from "../../authentication/firebase";
import PropTypes from "prop-types";

const userAuthContext = createContext();
export default function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
    recaptchaVerifier.render();

  }  function logOut() {
    return signOut(auth);
  }
  return (
    <userAuthContext.Provider
      value={{
        user, logIn, signUp, logOut, 
        setUpRecaptha,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
UserAuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
