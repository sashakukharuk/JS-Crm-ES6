import {DataApp} from "../DataApp";
import {UtilRequest} from "../components/util";

export function CategoriesData() {
    this._dataApp = new DataApp()
    this._request = new UtilRequest()

    this.requestGetCategories = async () => {
        return await this._request.start('category', 'GET')
    }

    this.requestGetCategory = async (id) => {
        return await this._request.start(`category/${id}`, 'GET')
    }

    this.requestPostCategory = async (fd) => {
        const token = await this._dataApp.requestGetToken()
        return await fetch(`http://localhost:5000/api/category`, {
            method: 'POST',
            body: fd,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(res => res.json())
    }

    this.requestPatchCategory = async (id, fd) => {
        const token = await this._dataApp.requestGetToken()
        return await fetch(`http://localhost:5000/api/category`, {
            method: 'PATCH',
            body: fd,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(res => res.json())
    }

    this.requestRemoveCategory = async () => {
        const id = window.location.href.replace('http://localhost:8080/CRM.html?categories?', '')
        return await this._request.start(`category/${id}`, 'DELETE')
    }

    this.requestGetPositions = async (id) => {
        return await this._request.start(`position/${id}`, 'GET')
    }

    this.requestPostPosition = async (position) => {
        return await this._request.start(`position`, 'POST', JSON.stringify(position))
    }

    this.requestPatchPosition = async (id, position) => {
        return await this._request.start(`position/${id}`, 'PATCH', JSON.stringify(position))
    }

    this.requestRemovePosition = async (id) => {
        return await this._request.start(`position/${id}`, 'DELETE')
    }
}