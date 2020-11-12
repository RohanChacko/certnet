import React, {useState} from 'react';

import { GoogleLogin,GoogleLogout } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../Utils/refreshToken';
import { connect } from 'react-redux'

// Map state to props
function mapStateToProps(state) {
    return {
        user: state.user
    }
  }
  // Map functions that use dispatch to props
  function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch({ type: 'LOGOUT', payload: {} })
        },
        login: (user) => {
          dispatch({ type: 'LOGIN', payload: user })
      }
    }
  }

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function Login(props) {
   const [loggedIn, toggleStatus] = useState(false);
   const [user, updateUser] = useState({});


  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    toggleStatus(true);
    updateUser(res.profileObj);
    props.login(res.profileObj);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const logoutSuccess = (res) => {
    toggleStatus(false);
    props.logout();
  };


  return (
    <div>
        {loggedIn && <p>Welcome {user.name}!</p>}
      { !loggedIn &&  <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      /> }
      { loggedIn && <GoogleLogout buttonText="Logout" onLogoutSuccess={logoutSuccess} />}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

