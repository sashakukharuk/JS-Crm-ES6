import {DataApp} from "./DataApp";

export class LogicApp extends DataApp {
    constructor() {
        super()
    }

    getToken = async (): Promise<string> => {
        if (!this.token) {
            this.token = JSON.parse(localStorage.getItem('token'))
        }
        if (!this.token) {
            this.token = await this.requestGetToken()
        }
        return this.token
    }

     removeToken = (): void => {
        this.requestRemoveToken()
         localStorage.clear()
    }
}
