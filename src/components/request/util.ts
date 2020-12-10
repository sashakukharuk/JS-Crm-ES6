import {DataApp} from "../../DataApp";

export class UtilRequest {
    private dataApp: DataApp;
    constructor() {
        this.dataApp = new DataApp()
    }

    start = async (route: string, method: string, body?: BodyInit) => {
        const token = await this.dataApp.requestGetToken()
        return await fetch(`http://localhost:5000/api/${route}`, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(res => res.json())
    }

    startAuth = async (route: string, method: string, body?: BodyInit) => {
        return await fetch(`http://localhost:5000/api/${route}`, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
    }
}
