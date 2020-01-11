import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions';
import { history } from '../../helpers';

export const LogOutPage = () => {
    const dispatch = useDispatch();

    const logOutUser = () => {
        dispatch(userActions.logout());
    
        history.push("/");
    };

    return (
        <button className="btn btn-primary" onClick={() => logOutUser()}>Log Out</button>
    );
};