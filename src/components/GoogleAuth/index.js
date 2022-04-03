import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {auth2Init} from '../utils/auth';
import {signIn, signOut} from '../../actions';

const GoogleAuth = ({myState, signIn, signOut}) => {

  useEffect(() => {
    window.gapi.load('auth2', () => {
      auth2Init()
        .then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        updateAuth(auth.isSignedIn.get(), auth);
        auth.isSignedIn.listen(() => updateAuth(auth.isSignedIn.get(), auth));
      });
    });
  }, []);

  function updateAuth (isSignedIn, authObj) {
    const userID = authObj.currentUser.get().getId();
    isSignedIn ? signIn(userID) : signOut(); 
  };

  const logInOnClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };
  const logOutOnClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };
  const renderAuthButton = () => {
    if (myState === null) {
      return <div>NULL</div>
    } else if (myState) {
      return <button onClick={logOutOnClick}>Log-Out</button>
    } else {
      return <button onClick={logInOnClick}>Log-In with Google</button>
    }
  };

  return <div>{renderAuthButton()}</div>;

};

const mapStateToProps = state => ({myState: state.auth.isSignedIn});

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
