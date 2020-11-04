export class DataApp {
    constructor() {
        this.token = null
    }

    async requestGetToken() {
        if (this.token) {
            return this.token
        } else {
            this.token = await fetch('http://localhost:5000/api/auth/').then(res => res.json()).catch(e => e)
        }
        return this.token
    }

    requestRemoveToken() {
        fetch('http://localhost:5000/api/auth/', {
            method: 'DElETE'
        }).then(res => res.json()).catch(e => e)
    }
}