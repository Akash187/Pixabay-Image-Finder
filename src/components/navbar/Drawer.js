import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {MyContext} from '../contextAPI/MyProvider';
import {NavLink} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  list: {
    width: 250,
  }
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <MyContext.Consumer>
          {(context) => (
            <React.Fragment>
              {(context.state.uid === '') && (
                <List>
                  <ListItem button onClick={context.signInUsingGoogle}>
                    <ListItemText>Login</ListItemText>
                  </ListItem>
                </List>
              )}
            </React.Fragment>
          )}
        </MyContext.Consumer>
        <MyContext.Consumer>
          {(context) => (
            <React.Fragment>
              {(context.state.uid !== '') && (
                <div>
                  <List>
                    <ListItem>
                      <ListItemText>{context.state.name}</ListItemText>
                      <Tooltip title={context.state.email}>
                        <img src={context.state.photoURL} alt="avatar" className="avatarImage"/>
                      </Tooltip>
                    </ListItem>
                  </List>
                  <NavLink to="/favourites" className={'link'}>
                    <List>
                      <ListItem button>
                        <ListItemText>Favourites</ListItemText>
                      </ListItem>
                    </List>
                  </NavLink>
                  <List>
                    <ListItem button onClick={context.signOut}>
                      <ListItemText>LogOut</ListItemText>
                    </ListItem>
                  </List>
                </div>
              )}
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );

    return (
      <div>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
          <MenuIcon/>
        </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);