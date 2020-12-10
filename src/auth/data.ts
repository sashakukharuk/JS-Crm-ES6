import {UtilRequest} from "../components/request/util";
import {User} from "../components/interface";

export class DataAuth {
    private request: UtilRequest;
    constructor() {
        this.request = new UtilRequest()
    }

    async requestPostLogin(auth: User) {
        const token = await this.request.startAuth('auth/login', 'POST', JSON.stringify(auth))
        localStorage.setItem('token', JSON.stringify(token))
    }

    async requestPostRegister(auth: User) {
        await this.request.startAuth('auth/register', 'POST', JSON.stringify(auth))
    }
}
