import {DataApp} from "../DataApp";
import {UtilRequest} from "../components/request/util";
import {NewCategory, Position} from "../components/interface";

export class CategoriesData {
    private dataApp: DataApp;
    private request: UtilRequest;
    constructor() {
        this.dataApp = new DataApp()
        this.request = new UtilRequest()
    }

    async requestGetCategories() {
        return await this.request.start('category', 'GET')
    }

    async requestGetCategory(id: string) {
        return await this.request.start(`category/${id}`, 'GET')
    }

    async requestPostCategory(category: NewCategory) {
        const fd = new FormData()
        if (category.file) {
            fd.append('image', category.file, category.file.name)
        }
        const token = await this.dataApp.requestGetToken()
        debugger
        return await fetch(`http://localhost:5000/api/category`, {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(res => res.json())
    }

    async requestPatchCategory(id: string, category: NewCategory) {
        const fd = new FormData()
        if (category.file) {

            fd.append('image', category.file, category.file.name)
        }
        const token = await this.dataApp.requestGetToken()
        return await fetch(`http://localhost:5000/api/category/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(res => res.json())
    }

    async requestRemoveCategory() {
        const id = window.location.pathname.replace('categories/', '')
        return await this.request.start(`category/${id}`, 'DELETE')
    }

    async requestGetPositions(id: string) {
        return await this.request.start(`position/${id}`, 'GET')
    }

    async requestPostPosition(position: Position) {
        return await this.request.start(`position`, 'POST', JSON.stringify(position))
    }

    async requestPatchPosition(id: string, position: Position) {
        return await this.request.start(`position/${id}`, 'PATCH', JSON.stringify(position))
    }

    async requestRemovePosition(id: string) {
        return await this.request.start(`position/${id}`, 'DELETE')
    }
}
