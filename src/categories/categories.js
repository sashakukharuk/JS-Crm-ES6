import {CategoriesLogic} from "./CategoriesLogic";
import {CategoryPage} from "./category";
import '../style/categories.css'

export function CategoriesPage() {
    this.isTitle = false
    this.isNew = true
    this._logic = new CategoriesLogic()
    this._category = new CategoryPage()
    this.start = () => {
        const that = this
        function _categoriesPage() {
            const page = document.createElement('div')
            page.classList.add('categories')
            page.insertAdjacentHTML('afterbegin', `<div class="pageTitle">
                ${!that.isTitle ? `<h4>Categories</h4>`
                : `<h4>
                    <a id="linkCategories">Categories</a>
                    <i>/</i>
                    <span>${that.isNew ? 'Add ' : 'Editing'} category</span>
                </h4>`}
                ${that.isNew ? `<button id="add">Add</button>`
                : `<button id="delete">Delete</button>`}
            </div>
        
            <div data-content-categories>
                <div class="collection" data-content-collection>
                </div>
            </div>`)
            document.querySelector('[data-content]').appendChild(page)
            return page
        }

        this.toHTML = (c) => `
            <a class="item" data-id=${c._id}>${c.name}</a>
        `
        this.render = () => {
            this.categories = _categoriesPage()
            if (this.isTitle) {
                this.linkCategories = document.getElementById('linkCategories')
                this.linkCategories.addEventListener('click', this.backCategories)
                if (!that.isNew) {
                    this.deleteCategoryBtn = document.getElementById('delete')
                    this.deleteCategoryBtn.addEventListener('click', this.deleteCategory)
                }
            }
        }
        this.render()
        this.rerender = async () => {
            const categories = await this._logic.getCategories()
            this.categories.querySelector('[data-content-collection]').innerHTML = categories.map(this.toHTML).join('')
            this.linkCategory = document.querySelectorAll('[data-id]')
            this.addCategoryBtn = document.getElementById('add')
            this.linkCategory.forEach(c => c.addEventListener('click', this.openCategory))
            this.addCategoryBtn.addEventListener('click', this.addCategory)

        }
        this.rerender()
    }

    this.removeChild = () => {
        const parents = document.querySelector('.content')
        if (parents.firstChild) {
            parents.removeChild(parents.firstChild)
        }
    }

    this.utilRender = () => {
        this.removeChild()
        this.isNew = false
        this.render()
    }


    this.addCategory = () => {
        this.removeChild()
        this.isTitle = true
        this.isNew = true
        this.render()
        const id = null
        this._category.start(id, () => {
            this.utilRender()
        })
    }

    this.openCategory = (e) => {
        const id = e.target.dataset.id
        this.removeChild()
        window.history.pushState({}, 'name', `?categories?${id}`)
        this.isTitle = true
        this.isNew = false
        this.render()
        this._category.start(id, () => {
            this.utilRender()
        })
    }

    this.backCategories = () => {
        this.removeChild()
        window.history.pushState({}, 'name', `?categories`)
        this.isTitle = false
        this.isNew = true
        this.render()
        this.rerender()
    }

    this.disabledDelete = () => {
        this.deleteCategoryBtn.classList.add('active')
        this.deleteCategoryBtn.disabled = true
    }

    this.deleteCategory = async () => {
        this.disabledDelete()
        await this._logic.removeCategory()
        this.removeChild()
        this.isTitle = true
        this.isNew = true
        this.render()
        const id = null
        this._category.start(id, () => {
            this.utilRender()
        })
    }
}