import {DataApp} from "../DataApp";
import {UtilRequest} from "../components/request/util";

export class CategoriesData {
    constructor() {
        this._dataApp = new DataApp()
        this._request = new UtilRequest()
    }


    async requestGetCategories() {
        return await this._request.start('category', 'GET')
    }

    async requestGetCategory(id) {
        return await this._request.start(`category/${id}`, 'GET')
    }

    async requestPostCategory(fd) {
        const token = await this._dataApp.requestGetToken()
        return await fetch(`http://localhost:5000/api/category`, {
            method: 'POST',
            body: JSON.stringify(fd),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(res => res.json())
    }

    async requestPatchCategory(id, fd) {
        const token = await this._dataApp.requestGetToken()
        return await fetch(`http://localhost:5000/api/category/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(fd),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(res => res.json())
    }

    async requestRemoveCategory() {
        const id = window.location.href.replace('http://localhost:8080/CRM.html?categories?', '')
        return await this._request.start(`category/${id}`, 'DELETE')
    }

    async requestGetPositions(id) {
        return await this._request.start(`position/${id}`, 'GET')
    }

    async requestPostPosition(position) {
        return await this._request.start(`position`, 'POST', JSON.stringify(position))
    }

    async requestPatchPosition(id, position) {
        return await this._request.start(`position/${id}`, 'PATCH', JSON.stringify(position))
    }

    async requestRemovePosition(id) {
        return await this._request.start(`position/${id}`, 'DELETE')
    }
}