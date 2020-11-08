import {CategoriesData} from "./CategoriesData";

export class CategoriesLogic extends CategoriesData {
    constructor() {
        super()
    }

    async getCategories() {
        return await this.requestGetCategories()
    }

    async getCategory(id) {
        return await this.requestGetCategory(id)
    }

    async objectCategory(category) {
        const fd = new FormData()
        if (category.file) {
            fd.append('image', category.file, category.file.name)
        }
        fd.append('name', category.name)
        return fd
    }

    async postCategory(category) {
        // const fd = this.objectCategory(category)
        return await this.requestPostCategory(category)
    }

    async patchCategory(id, category) {
        // const fd = this.objectCategory(category)
        return  await this.requestPatchCategory(id, category)
    }

    async removeCategory() {
        await this.requestRemoveCategory()
    }

    async getPositions(id) {
        return await this.requestGetPositions(id)
    }

    async postPosition(id, name, cost, categoryId) {
        debugger
        await this.requestPostPosition({name, cost, category: categoryId})
    }

    async patchPosition(id, name, cost) {
        await this.requestPatchPosition(id, {name, cost})
    }

    async removePosition(id) {
        await this.requestRemovePosition(id)
    }
}