import {DataApp} from "./DataApp";

export function LogicApp() {
    this._token = null
    this._data = new DataApp()

    this.getToken = async () => {
        if (!this._token) {
            this._token = JSON.parse(localStorage.getItem('token'))
        }
        if (!this._token) {
            this._token = await this._data.requestGetToken()
        }
        return this._token
    }

     this.removeToken = () => {
        this._data.requestRemoveToken()
         localStorage.clear()
    }
}