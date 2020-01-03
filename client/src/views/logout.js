import React from 'react';
import { Button } from 'rebass';
import { withRouter } from 'react-router-dom';

const logOutUser = (props) => {
    window.localStorage.clear();

    props.history.push("/login");
};

const LogOut = (props) => {
 return (
    <Button onClick={logOutUser(props)} children="Log Out" />
 );
};

export default withRouter(props => LogOut(props));