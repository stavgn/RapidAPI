import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';
import { Home, Board, TopBar } from './';
import { isUserLoggedIn } from '../reducers/user';
import { PrivateRoute } from '../components';
import 'typeface-roboto';

export class App extends Component {

  constructor(props) {
    super(props);
    this.TOPBAR_HEIGHT = 96;
    this.LOGGIN_FORM_HEIGHT = 398;
  }

  state = {
    height: 500
  }

  updateDimensions = () => {
      const height = Math.max(window.innerHeight - this.TOPBAR_HEIGHT, this.LOGGIN_FORM_HEIGHT);
      this.setState({ height });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { user } = this.props;
    const { height } = this.state;
    const baseUrl = process.env.PUBLIC_URL;
    return (
      <div>
        <TopBar />
        <Route exact path={baseUrl +"/"} render={(props) => <Home {...props} height={height} />}/>
        <PrivateRoute exact path={baseUrl + "/board"} rejectRedirect="/" auth={() => isUserLoggedIn(user)} render={(props) => <Board {...props} height={height} />} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};


export default withRouter(connect(mapStateToProps)(App));
