import { post } from './crud';

class accountService {
    constructor() {
        this.serverBaseURL = 'https://localhost:5001/api/v1/users';
        this.loginURL = `${this.serverBaseURL}/login`;
        this.registerURL = `${this.serverBaseURL}/register`;
    }

    login(credentials) {
        return post(this.loginURL, credentials);
    }

    register(credentials) {
        return post(this.registerURL, credentials);
    }
}

export default accountService;