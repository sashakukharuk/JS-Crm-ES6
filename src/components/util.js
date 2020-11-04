import {DataApp} from "../DataApp";

export function UtilRequest() {
    this._dataApp = new DataApp()
    this.start = async (route, method, body) => {
        const token = await this._dataApp.requestGetToken()
        return await fetch(`http://localhost:5000/api/${route}`, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(res => res.json())
    }

    this.startAuth = async (route, method, body) => {
        return await fetch(`http://localhost:5000/api/${route}`, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
    }
}