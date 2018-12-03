import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import {MyContext} from '../contextAPI/MyProvider';
import TemporaryDrawer from './Drawer';

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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense" className={'toolbar'}>
            <div className={'navLeftSide'}>
              <div className="menuIcon">
                <TemporaryDrawer/>
              </div>
              <Typography variant="title" color="inherit">
                <NavLink to="/" className={'link'}>Pixabay Image Finder</NavLink>
              </Typography>
            </div>
            <div className={'navRightSide'}>
              <MyContext.Consumer>
                {(context) => (
                  <React.Fragment>
                    {(context.state.uid === '') && (
                      <div>
                        <Button color={'inherit'} onClick={context.signInUsingGoogle}>
                          Login
                        </Button>
                      </div>
                    )}
                  </React.Fragment>
                )}
              </MyContext.Consumer>
              <MyContext.Consumer>
                {(context) => (
                  <React.Fragment>
                    {(context.state.uid !== '') && (
                      <div>
                        <Tooltip title={context.state.email}>
                          <img src={context.state.photoURL} alt="avatar" className="avatarImage"/>
                        </Tooltip>
                        <NavLink to="/favourites" className={'link'}>
                          <Button color={'inherit'}>
                            Favourites
                          </Button>
                        </NavLink>
                        <Button color={'inherit'} onClick={context.signOut}>
                          LogOut
                        </Button>
                      </div>
                    )}
                  </React.Fragment>
                )}
              </MyContext.Consumer>
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