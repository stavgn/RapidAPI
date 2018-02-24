import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';

export default class PrivateRoute extends Component {

  static propTypes = {
    auth: PropTypes.func.isRequired,
    component: (props, propName, componetName) => {
      if (props.component && props.render)
        return new Error(`Use componet prop or render. Cannot use both in ${componetName}`);
      if (!props.component && !props.render)
          return new Error(`Use componet prop or render. Cannot use both in ${componetName}`);
    },
    render: PropTypes.func,
    rejectRedirect: PropTypes.string.isRequired
  }

  render() {
    const { auth, rejectRedirect, component: Component, render: Render, ...rest } = this.props;
    if (Component)
      return <Route {...rest} render={(props) => auth() ? <Component {...props} /> : <Redirect to={{pathname: rejectRedirect, state: {from: props.location}}}/>} />;
    else
      return <Route {...rest} render={(props) => auth() ? <Render {...props} /> : <Redirect to={{pathname: rejectRedirect, state: {from: props.location}}}/>} />;
  }
}
