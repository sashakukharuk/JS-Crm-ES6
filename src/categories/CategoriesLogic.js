import {CategoriesData} from "./CategoriesData";

export function CategoriesLogic() {
    this._categories = []
    this._category = {}
    this._data = new CategoriesData()
    this.getCategories = async () => {
        this._categories = await this._data.requestGetCategories()
        return this._categories
    }

    this.getCategory = async (id) => {
        return await this._data.requestGetCategory(id)
    }

    this.objectCategory = (category) => {
        const fd = new FormData()
        if (category.file) {
            fd.append('image', category.file, category.file.name)
        }
        fd.append('name', category.name)
        return fd
    }

    this.postCategory = async (category) => {
        const fd = this.objectCategory(category)
        this._category =  await this._data.requestPostCategory(fd)
        return this._category
    }

    this.patchCategory = async (id, category) => {
        const fd = this.objectCategory(category)
        this._category =  await this._data.requestPatchCategory(id, fd)
        return this._category
    }

    this.removeCategory = async () => {
        await this._data.requestRemoveCategory()
    }

    this.getPositions = async (id) => {
        return await this._data.requestGetPositions(id)
    }

    this.postPosition = async (position) => {
        await this._data.requestPostPosition(position)
    }

    this.patchPosition = async (id, position) => {
        await this._data.requestPatchPosition(id, position)
    }

    this.removePosition = async (id) => {
        await this._data.requestRemovePosition(id)
    }
}