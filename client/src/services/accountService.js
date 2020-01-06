import { post, clearStorage } from '../helpers';
import { serviceBaseURL } from '../constants';

export class AccountService {
    constructor() {
        this.serverBaseURL = serviceBaseURL;
        this.loginURL = `${this.serverBaseURL}/login`;
        this.registerURL = `${this.serverBaseURL}/register`;
    }

    login(credentials) {
        return post(this.loginURL, credentials);
    }

    register(credentials) {
        return post(this.registerURL, credentials);
    }

    logout() {
        return clearStorage();
    }
}