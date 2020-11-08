import {DataAuth} from "./data";

export class LogicAuth extends DataAuth {
    constructor() {
        super()
    }
    async postLogin(auth) {
        await this.requestPostLogin(auth)
    }

    async postRegister(auth) {
        await this.requestPostRegister(auth)
    }
}