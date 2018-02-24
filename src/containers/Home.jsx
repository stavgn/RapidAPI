import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { attemptLogin } from '../actions';
import './Home.css';

export class Home extends PureComponent {

  static propTypes = {
    height: PropTypes.number.isRequired
  }

  state = {
    username: '',
    password: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleLogIn = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.attemptLogin(username, password);
  }

  render() {
    const { height } = this.props;
    const { username, password } = this.state;
    return (
      <Grid container justify="center" alignItems="center" className="grid" style={{height: height}}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className="paper">
            <Typography align="center" variant="title">
              Login
            </Typography>
            <form onSubmit={this.handleLogIn}>
                <TextField label="Username" onChange={this.handleChange('username')} value={username} fullWidth required margin="normal"/>
                <br />
                <TextField label="Password" type="password" onChange={this.handleChange('password')} value={password} fullWidth required  margin="normal"/>
                <br />
                <Button type="submit" variant="raised" color="primary"  className="loginbutton">Log In</Button>
              </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: bindActionCreators(attemptLogin, dispatch)
  };
}
export default withRouter(connect(null, mapDispatchToProps)(Home));
