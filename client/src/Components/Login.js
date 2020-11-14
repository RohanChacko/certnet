import React, {useState} from 'react';

import { GoogleLogin,GoogleLogout } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../Utils/refreshToken';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
// import { getUser, postUser } from "../Utils/apiConnect";

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

  function SimpleDialog(props) {
    const { onClose, open } = props;
  
    const handleClose = () => {
      onClose('Student');
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} disableBackdropClick={true}>
        <DialogTitle id="simple-dialog-title">Select user type</DialogTitle>
        <List>
            <ListItem button onClick={() => handleListItemClick('Student')} key={'Student'}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'Student'} />
            </ListItem>
            <ListItem button onClick={() => handleListItemClick('Org')} key={'Org'}>
              <ListItemAvatar>
                <Avatar>
                  <AccountBalanceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'Org'} />
            </ListItem>
        </List>
      </Dialog>
    );
  }
  
const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function getUserObj(userId) {
  // getUser(userId).then(data => {
  //   return data;
  // })
  // return {};
  return {};
  return {id:'123',name:'First Don', givenName:'First', familyName:'Don', email:'damn@damn.com', type:'Student'};
}

function Login(props) {
   const [loggedIn, toggleStatus] = useState(false);
   const [user, updateUser] = useState({});
   const [open, setOpen] = React.useState(false);
   const [type, setType] = useState('');

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    const data = getUserObj(res.profileObj.id);
    if (data.id != undefined) {
      toggleStatus(true);
      updateUser(data);
      props.login(data);
    } else {
      // set type
      updateUser(res.profileObj);
      setOpen(true);
    }
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

  const handleClose = (value) => {
    setOpen(false);
    const newuser = user;
    newuser.type = value;
    toggleStatus(true);
    updateUser(newuser);
    props.login(newuser);
    // postUser(user).then(res => {
    //   console.log('post request response is', res);
    // })
  };

  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} />
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

