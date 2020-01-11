import { post } from '../helpers';
import { serviceBaseURL } from '../constants';

export class AccountService {
    constructor() {
        this.serverBaseURL = serviceBaseURL;
        this.loginURL = `${this.serverBaseURL}/users/login`;
        this.facebookLoginUrl = `${this.serverBaseURL}/externalauth/facebook/`;
        this.registerURL = `${this.serverBaseURL}/users/register`;
    }

    login(credentials) {
        const url = credentials.facebookLoginUrl ? this.facebookLoginUrl : this.loginURL;
        return post(url, credentials);
    }

    register(credentials) {
        return post(this.registerURL, credentials);
    }

    logout() {
        return window.localStorage.removeItem('auth_token');
    }
}