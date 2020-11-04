import {UtilRequest} from "../components/util";

export function DataAuth() {
    this._request = new UtilRequest()

    this.requestPostLogin = async (auth) => {
        const token = await this._request.startAuth('auth/login', 'POST', JSON.stringify(auth))
        localStorage.setItem('token', JSON.stringify(token))
    }

    this.requestPostRegister = async (auth) => {
        await this._request.startAuth('auth/register', 'POST', JSON.stringify(auth))
    }
}