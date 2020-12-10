import {CategoriesLogic} from "./CategoriesLogic";
import {CategoryPage} from "./category";
import '../style/categories.css'
import {Preloader} from "../components/preloader/preloader";

export class CategoriesPage extends CategoriesLogic {
    private isTitle: boolean;
    private isNew: boolean;
    private category: CategoryPage;
    private preloader: Preloader;
    private render: () => void;
    private categories: HTMLDivElement;
    private linkCategories: HTMLElement;
    private deleteCategoryBtn: any;
    private addCategoryBtn: HTMLElement;
    private rerender: () => Promise<void>;
    private linkCategory: NodeListOf<Element>;
    constructor() {
        super()
        this.isTitle = false
        this.isNew = true
        this.category = new CategoryPage()
        this.preloader = new Preloader()
    }

    start() {
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
        
            <div data-content-category>
            </div>`)
            document.querySelector('[data-content]').appendChild(page)
            return page
        }

        this.render = () => {
            this.preloader.start()
            this.categories = _categoriesPage()
            if (this.isTitle) {
                this.linkCategories = document.getElementById('linkCategories')
                this.linkCategories.addEventListener('click', this.backCategories.bind(this))
                if (!this.isNew) {
                    this.deleteCategoryBtn = document.getElementById('delete')
                    this.deleteCategoryBtn.addEventListener('click', this.deleteCategory.bind(this))
                }
            }
            if(this.isNew) {
                this.addCategoryBtn = document.getElementById('add')
                this.addCategoryBtn.addEventListener('click', this.addCategory.bind(this))
            }
            this.preloader.removePreloader()
        }
        this.render()
        this.rerender = async () => {
            this.preloader.start()
            this.categories.querySelector('[data-content-category]').innerHTML = await this.getCategories()
            this.linkCategory = document.querySelectorAll('[data-id]')
            this.linkCategory.forEach(c => c.addEventListener('click', this.openCategory.bind(this)))
            this.preloader.removePreloader()
        }
        this.rerender()
    }

    utilRender() {
        this.removeChild()
        this.isNew = false
        this.render()
    }

    addCategory() {
        this.removeChild()
        this.isTitle = true
        this.isNew = true
        this.render()
        this.category.start(null, () => this.utilRender())
    }

    openCategory(e: any) {
        const id = e.target.dataset.id
        this.removeChild()
        window.history.pushState({}, 'name', `/categories/${id}`)
        this.isTitle = true
        this.isNew = false
        this.render()
        this.category.start(id, () => this.utilRender())
    }

    backCategories() {
        this.removeChild()
        window.history.pushState({}, 'name', `/categories`)
        this.isTitle = false
        this.isNew = true
        this.render()
        this.rerender()
    }

    disabledDelete() {
        this.deleteCategoryBtn.classList.add('active')
        this.deleteCategoryBtn.disabled = true
    }

    async deleteCategory() {
        this.disabledDelete()
        await this.removeCategory()
        this.removeChild()
        this.isTitle = true
        this.isNew = true
        this.render()
        this.category.start(null, () => this.utilRender())
    }
}
