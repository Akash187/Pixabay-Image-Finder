import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {auth, provider} from '../../firebase/firebase';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

class NavBar extends React.Component{

  signInUsingGoogle = () => {
    auth.signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  };

  signOut = () => {
    auth.signOut().then(function() {
      // Sign-out successful.
      console.log("sign out successful!")
    }).catch(function(error) {
      // An error happened.
      console.log(`SignOut Error : ${error}`)
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense" className={'toolbar'}>
            <div className={'navLeftSide'}>
              <Typography variant="title" color="inherit">
                <NavLink to="/" className={'link'}>Pixabay Image Finder</NavLink>
              </Typography>
            </div>
            <div>
              <Button color={'inherit'}>
                <NavLink to="/favourites" className={'link'}>Favourites</NavLink>
              </Button>
              <Button color={'inherit'} onClick={this.signInUsingGoogle}>
                Login
              </Button>
              <Button color={'inherit'} onClick={this.signOut}>
                Login Out
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);