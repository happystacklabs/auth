import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
};


const defaultProps = {
  currentUser: undefined,
};


export const PrivateRoute = ({ path, component, currentUser }) => {
  if (!currentUser) {
    return (<Redirect to="/login" />);
  }
  return (<Route path={path} component={component} />);
};


PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;


export default PrivateRoute;
