import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import { logOutAndRedirect } from '../actions';
import { isUserLoggedIn } from '../reducers/user';
import logo from '../static/logo.png';
import './TopBar.css';

export class TopBar extends PureComponent {

  static propTypes = {
    logOutAndRedirect: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogOut = event => {
    this.setState({ anchorEl: null },() => this.props.logOutAndRedirect());
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {user, user: { username }} = this.props;
    const isLoggedIn = isUserLoggedIn(user);

    return (
        <Grid container>
          <Grid item xs={12}>
            <AppBar position="static" style={{backgroundColor: isLoggedIn ? '#2196F3' : '#F5F5F5'}} className="rootAppBar">
              <Toolbar>
                <img src={logo} alt="RapidAPI" className="logo"/>
                <Typography className="AppBarText" style={{color: isLoggedIn ? '#F5F5F5' : 'black'}}>
                  Code Challenge
                </Typography>

                { isLoggedIn && (
                <div>
                  <Typography className="greeting" style={{color: isLoggedIn ? '#F5F5F5' : 'black'}}>
                    Hi {username}!
                  </Typography>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    className="menu"
                    open={open}
                    onClose={this.handleClose}
                    >
                    <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
                  </Menu>
                </div> )}
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>);
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutAndRedirect: bindActionCreators(logOutAndRedirect, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
