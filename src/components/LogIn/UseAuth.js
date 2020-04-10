import React, { useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import { Route, Redirect} from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const authContext = createContext();

export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext);

export function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  

const Auth = () => {

    const [user, setUser] = useState(null);

    const getUser = user => {
        const {displayName, email, photoURL} = user;
            return {
                name: displayName,
                email: email,
                photo: photoURL
            }
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const signedInUser = getUser(res.user);
            setUser(signedInUser);
            return res.user;
        })
        .catch(error => {
            setUser(null);
            return error.message;
        })
    }

    const signOutWithGoogle = () => {
        return firebase.auth().signOut()
        .then(res => {
            // Sign-out successful.
            return true;
        })
        .catch(error => {
            // An error happened.
            return false;
        });
          
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const currentUser = getUser(user);
                setUser(currentUser);
            }
            else {
                console.log('User not found');
            }
            
        })
    },[])

    return {
        user,
        signInWithGoogle,
        signOutWithGoogle
    }

}

export default Auth;