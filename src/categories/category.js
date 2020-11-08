import {CategoriesLogic} from "./CategoriesLogic";
import {PositionPage} from "./position";
import '../style/categories.css'
import {Input} from "../components/inputControls/inputControls";

export class CategoryPage extends CategoriesLogic {
    constructor() {
        super()
        this._position = new PositionPage()
    }

    start(id, callBack) {
        function _createCategory(options) {
            const category = document.createElement('div')
            category.classList.add('category')
            category.insertAdjacentHTML('afterbegin', `
            <div class="form">
                <div class="content un-content">
                    <div class="field" data-category-input>
                        ${options ? `<input type='text' name='name'  placeholder='name' value=${options.name} id="name"/>` : ''}
                    </div>
                    <div class="fieldPhoto">
                        <input type='file' name='imageSrc' id="file"/>
                    </div>
                </div>              
                <div class="category-btn" >
                    <button ${options ? `data-id=${options._id}` : ''} id="save">
                        Save
                    </button>
                </div>
            </div>
            <div class="photo">
                <img src=${options ? `http://localhost:5000/${options.imageSrc}` : '#'} alt=''/>
            </div>
            ${options ? `<div data-content-category>
            </div>` : ''}
            `)
            document.querySelector('[data-content-categories]').appendChild(category)
            return category
        }

        this.render = async (newCategory) => {
            if (id) {
                const category = await this.getCategory(id)
                _createCategory(category)
                this._position.start(id)
                this.isCreate = false
            } else if (newCategory) {
                _createCategory(newCategory)
                this._position.start(newCategory._id)
                window.history.pushState({}, 'name', `?categories?${newCategory._id}`)
                this.isCreate = false
            } else {
                _createCategory()
                this.isCreate = true
                this.name = new Input('name', 'text', 'data-category-input', 3, 10)
                this.name.start()
            }

            this.saveBtn = document.getElementById('save')

            this.isCreate ? this.saveBtn.addEventListener('click', () => this.addCategory(callBack))
            : this.saveBtn.addEventListener('click', (e) => this.updateCategory(e, callBack))
        }
        this.render()
    }

    disabled() {
        this.saveBtn.classList.add('active')
        this.saveBtn.disabled = true
    }

    objectCategory() {
        const name = document.getElementById('name').value
        const file = document.getElementById('file').files[0]
        return {name, file}
    }

    async addCategory(callBack) {
        const category = this.objectCategory()
        this.disabled()
        const newCategory = await this.postCategory(category)
        callBack()
        this.render(newCategory)
    }

    async updateCategory(e, callBack) {
        const id = e.target.dataset.id
        const category = this.objectCategory()
        this.disabled()
        const newCategory = await this.patchCategory(id, category)
        callBack()
        this.render(newCategory)
    }
}