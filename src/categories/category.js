import {CategoriesLogic} from "./CategoriesLogic";
import {PositionPage} from "./position";
import '../style/categories.css'
import {Input} from "../components/inputControls/inputControls";

export function CategoryPage() {
    this._logic = new CategoriesLogic()
    this._position = new PositionPage()
    this.start = (id, callBack) => {
        function _createCategory(options) {
            const category = document.createElement('div')
            category.classList.add('category')
            category.insertAdjacentHTML('afterbegin', `
            <div class="form">
                <div class="content un-content">
                    <div class="field" data-category-input>
                        ${options ? `<input type='text' name='name'  placeholder='name' value=${options.name} id="nameCategory"/>` : ''}
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
                const category = await this._logic.getCategory(id)
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

    this.disabled = () => {
        this.saveBtn.classList.add('active')
        this.saveBtn.disabled = true
    }

    this.objectCategory = () => {
        const name = document.getElementById('name').value
        const file = document.getElementById('file').files[0]
        return {name, file}
    }

    this.addCategory = async (callBack) => {
        const category = this.objectCategory()
        this.disabled()
        const newCategory = await this._logic.postCategory(category)
        callBack()
        this.render(newCategory)
    }

    this.updateCategory = async (e, callBack) => {
        const id = e.target.dataset.id
        const category = this.objectCategory()
        this.disabled()
        const newCategory = await this._logic.patchCategory(id, category)
        callBack()
        this.render(newCategory)
    }
}