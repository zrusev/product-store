import React from 'react';
import { withRouter } from 'react-router-dom';

const logOutUser = (props) => {
    window.localStorage.clear();

    props.history.push("/login");
};

const LogOut = (props) => {
 return (
    <button className="btn btn-primary" onClick={logOutUser(props)}>Log Out</button>
 );
};

export const LogOutPage = withRouter(props => LogOut(props));