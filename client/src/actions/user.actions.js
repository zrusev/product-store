import { userConstants } from '../constants';
import { AccountService } from '../services';
import { alertActions } from './alert.actions';

const service = new AccountService();

export const userActions = {
    login: (email, password) => {
        const request = user => ({ type: userConstants.LOGIN_REQUEST, user }); 
        const success = user => ({ type: userConstants.LOGIN_SUCCESS, user });
        const failure = error => ({ type: userConstants.LOGIN_FAILURE, error });

        return dispatch => {
            dispatch(request({ email }));
    
            service.login({ email, password })
                .then(
                    user => { 
                        dispatch(success(user));

                        if (user.token) {
                            window.localStorage.setItem('auth_token', user.token);
                        }
                    },
                    error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
    },
    logout: () => {
        service.logout();

        return { type: userConstants.LOGOUT };
    },
    register: (email, password) => {
        const request = user => ({ type: userConstants.REGISTER_REQUEST, user }); 
        const success = user => ({ type: userConstants.REGISTER_SUCCESS, user });
        const failure = error => ({ type: userConstants.REGISTER_FAILURE, error });
        
        return dispatch => {
            dispatch(request({ email }));
    
            service.register({ email, password })
                .then(
                    user => { 
                        dispatch(success(user));

                        if (user.token) {
                            window.localStorage.setItem('auth_token', user.token);
                        }
                    },
                    error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
    },
};