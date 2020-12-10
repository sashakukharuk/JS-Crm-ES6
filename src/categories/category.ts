import {CategoriesLogic} from "./CategoriesLogic";
import {PositionPage} from "./position";
import '../style/categories.css'
import {Preloader} from "../components/preloader/preloader";
import {Category} from "../components/interface";

export class CategoryPage extends CategoriesLogic {
    private position: PositionPage;
    private preloader: Preloader;
    private render: (newCategory: Category) => Promise<void>;
    private isCreate: boolean;
    private saveBtn: any;
    private changeImage: HTMLElement;
    constructor() {
        super()
        this.position = new PositionPage()
        this.preloader = new Preloader()
    }
    start(id: string, callBack: () => void) {
        function _createCategory(category: Category) {
            const categoryPage = document.createElement('div')
            categoryPage.classList.add('category')
            categoryPage.insertAdjacentHTML('afterbegin', `
            <div class="form">
                <div class="content un-content">
                    <div class="field" data-category-input="true">
                    </div>
                    <div class="fieldPhoto">
                        <input type='file' name='imageSrc' id="file"/>
                        <label for="file">Upload</label>
                    </div>
                </div>              
                <div class="category-btn" >
                    <button ${category ? `data-id=${category._id}` : ''} id="save">
                        Save
                    </button>
                </div>
            </div>
            <div class="photo">
                ${category ? `<img src=${`http://localhost:5000/${category.imageSrc}`} alt=''/>` : ''}
            </div>
            ${category ? `<div data-content-position>
            </div>` : ''}
            `)
            document.querySelector('[data-content-category]').appendChild(categoryPage)
            return categoryPage
        }
        this.render = async (newCategory) => {
            this.preloader.start()
            if (id) {
                const category = await this.getCategory(id)
                _createCategory(category)
                this.insertInput(category.name)
                this.position.start(id)
                this.isCreate = false
            } else if (newCategory) {
                _createCategory(newCategory)
                this.insertInput(newCategory.name)
                this.position.start(newCategory._id)
                window.history.pushState({}, 'name', `/categories?${newCategory._id}`)
                this.isCreate = false
            } else {
                _createCategory(null)
                this.isCreate = true
                this.insertInput(null)
            }

            this.saveBtn = document.getElementById('save')
            this.changeImage = document.getElementById('file')

            this.changeImage.addEventListener('change', this.onFileUpload.bind(this))
            this.isCreate ? this.saveBtn.addEventListener('click', () => this.addCategory(callBack))
            : this.saveBtn.addEventListener('click', (e: any) => this.updateCategory(e, callBack))
            this.preloader.removePreloader()
        }
        this.render(null)
    }

    onFileUpload(event: any) {
        this.fileUpload(event)
    }

    onDisabled() {
        this.saveBtn.classList.add('active')
        this.saveBtn.disabled = true
    }

    offDisabled() {
        this.saveBtn.classList.remove('active')
        this.saveBtn.disabled = false
    }

    async addCategory(callBack: () => void) {
        this.onDisabled()
        const category = this.objectCategory()
        this.postCategory(null, category).then(res => {
            this.offDisabled()
            callBack()
            this.render(res)
        })
    }

    async updateCategory(e: any, callBack: () => void) {
        this.onDisabled()
        const id = e.target.dataset.id
        const category = this.objectCategory()
        this.patchCategory(id, category).then(res => {
            this.offDisabled()
            callBack()
            this.render(res)
        })
    }
}
