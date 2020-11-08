import {DataApp} from "./DataApp";

export class LogicApp extends DataApp {
    constructor() {
        super()
        this._token = null
    }

    getToken = async () => {
        if (!this._token) {
            this._token = JSON.parse(localStorage.getItem('token'))
        }
        if (!this._token) {
            this._token = await this.requestGetToken()
        }
        return this._token
    }

     removeToken = () => {
        this.requestRemoveToken()
         localStorage.clear()
    }
}