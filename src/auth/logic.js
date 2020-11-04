import {DataAuth} from "./data";

export function LogicAuth () {
    this._data = new DataAuth()
    this.postLogin = async (auth) => {
        await this._data.requestPostLogin(auth)
    }

    this.postRegister = async (auth) => {
        await this._data.requestPostRegister(auth)
    }
}