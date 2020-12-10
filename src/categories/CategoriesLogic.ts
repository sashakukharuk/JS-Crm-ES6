import {CategoriesData} from "./CategoriesData";
import {ObjectHtml} from "../components/html/object-html";
import {Category, NewCategory, Position} from "../components/interface";
import {Input} from "../components/inputControls/inputControls";
import {ModalForm} from "../components/modal/modalForm";

export class CategoriesLogic extends CategoriesData {
    constructor() {
        super()
    }

    async getOrderCategories() {
        const toHTML = (categories: Category) => `
        <div class="card">
            <div class="center">
                <a><img src=${`http://localhost:5000/${categories.imageSrc}`} data-id=${categories._id} class="responsive-img order-img" alt="PHOTO"></a>
            </div>
            <div class="content">
                <h5 class="m0">${categories.name}</h5>
            </div>
        </div>`
        return await new ObjectHtml(toHTML, this.requestGetCategories.bind(this), 'Categories').getItemInHTML()
    }

    async getCategories() {
        const toHTML = (c: Category) => `<div class="collection"><a class="item" data-id=${c._id}>${c.name}</a></div>`
        return await new ObjectHtml(toHTML, this.requestGetCategories.bind(this), 'Categories').getItemInHTML()
    }

    async getCategory(id: string) {
        return await this.requestGetCategory(id)
    }

    async postCategory(id: string, category: NewCategory): Promise<Category> {
        return await this.requestPostCategory(category)
    }

    async patchCategory(id: string, category: NewCategory): Promise<Category> {
        return  await this.requestPatchCategory(id, category)
    }

    async removeCategory() {
        await this.requestRemoveCategory()
    }

    async getPositions(id: string) {
        return this.requestGetPositions(id)
    }

    async getPositionsHTML(id: string) {
        const toHTML = (p: Position) => `
        <div class="position-collection">
            <div data-modal="true" data-id=${p._id}   class="position">
                <span>
                    ${p.name} <strong>${p.cost} uah.</strong>
                </span>
            </div>
            <div class="deletePosition">
                <button data-id=${p._id} id=${p._id}>
                   delete
                </button>
            </div>
        </div>`
        return await new ObjectHtml(toHTML, () => this.requestGetPositions(id), 'Positions').getItemInHTML()
    }

    async postPosition(id: string, name: string, cost: number, categoryId: string) {
        return await this.requestPostPosition({name, cost, category: categoryId})
    }

    async patchPosition(id: string, name: string, cost: number) {
        return await this.requestPatchPosition(id, {name, cost})
    }

    async removePosition(id: string) {
        await this.requestRemovePosition(id)
    }

    removeChild() {
        const parents = document.querySelector('.content')
        if (parents.firstChild) {
            parents.removeChild(parents.firstChild)
        }
    }

    insertInput(value: string) {
        new Input('name', 'text', 'data-category-input', 3, 10, value).start()
    }

    fileUpload(event: any) {
        const img = document.querySelector('.photo')
        img.removeChild(img.firstChild)
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            const imagePreview = reader.result
            img.innerHTML = `<img src=${imagePreview} alt=""/>`
        }
        reader.readAsDataURL(file)
    }

    objectCategory() {
        const nameElement: any = document.getElementById('name')
        const name = nameElement.value
        const photo: any = document.getElementById('file')
        const file = photo.files[0]
        return {name, file}
    }

    disabledBtnDelete(id: string) {
        const deletePosBtn: any = document.getElementById(`${id}`)
        deletePosBtn.classList.add('active')
        deletePosBtn.disabled = true
    }


    openModal(logicFunction: (arg0: string, arg1: string, arg2: number, arg3: string) => any, renderFunction: () => void, position: Position, positionId: string, categoryId: string) {
        const modal = new ModalForm(position, {
            post: (name: string, cost: number) => logicFunction(positionId, name, cost, categoryId),
            render: () => renderFunction()
        })
        modal.start()
    }
}
