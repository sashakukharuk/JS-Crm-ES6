import {UtilRequest} from "../components/request/util";

export class DataAuth {
    constructor() {
        this._request = new UtilRequest()
    }


    async requestPostLogin(auth) {
        const token = await this._request.startAuth('auth/login', 'POST', JSON.stringify(auth))
        localStorage.setItem('token', JSON.stringify(token))
    }

    async requestPostRegister(auth) {
        await this._request.startAuth('auth/register', 'POST', JSON.stringify(auth))
    }
}