import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { history } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { userActions, alertActions } from '../../../actions';

export const Facebook = () => {
    const dispatch = useDispatch();

    const handleResFailure = () => {
        history.push("/");

        dispatch(alertActions.error([ 
            { 
                code: 'InvalidFacebookAuthentication',
                description: 'Invalid authentication at Facebook'
            } 
        ]));
    }

    const handleResSuccess = response => {
        const { accessToken } = response;

        if(accessToken)
            dispatch(userActions.loginWithFacebook(accessToken));

        history.push("/");
    }
    
    return (
        <FacebookLogin
            appId={process.env.REACT_APP_FB_APP_ID}
            callback={handleResSuccess}
            onFailure={handleResFailure}
            size='small'
            textButton='Continue with Facebook'
            scope='email'
            cssClass='btn btn-primary'
        />
    )
}