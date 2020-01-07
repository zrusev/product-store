import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector(state => state.authentication.loggedIn);

  return <Route render={props => (loggedIn 
                                  ? <Component {...props} /> 
                                  : <Redirect to="/login" />)} 
            {...rest}
        />;
};