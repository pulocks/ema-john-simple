import React from 'react';
import Auth from './UseAuth';

const LogIn = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(res => {
            window.location.pathname = '/review';
        })
    };

    const handleSignOut = () => {
        auth.signOutWithGoogle()
        .then(res => {
            window.location.pathname = '/shop';
        })
    };

    return (
        <div>
            <h1>Join the Party!!!</h1>
            {
                auth.user ? <button onClick={handleSignOut}>Sign out</button> :
                <button onClick={handleSignIn}>Sign in with Google</button>
            }
        </div>
    );
};

export default LogIn;