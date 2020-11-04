import {CategoriesLogic} from "../categories/CategoriesLogic";
import {UiOrderPage} from "./ui";
import '../style/orderCategories.css'
export function OrderCategories() {
    this.isAddOrder = false
    this._logic = new CategoriesLogic()
    this._orderPage = new UiOrderPage()
    this.start = () => {
        const that = this
        function _createCategories() {
            const categories = document.createElement('div')
            categories.classList.add('order-categories')
            categories.insertAdjacentHTML('afterbegin', `
            <div class="page-title" id="ordersPage">
               ${ !that.isAddOrder ? `<h4>Order</h4>`
                : `<h4>
                    <a id="linkOrder">Order</a>
                    <i>/</i>
                    Add product
                </h4>`}
                <button id="completeBtn" class="onBtn" data-open="explore-order">
                    Завершить
                </button>
            </div>
            <div class="frow" data-content-order >
                <div data-content-card id="card"></div>
            </div>
            `)
            document.querySelector('[data-content]').appendChild(categories)
            return categories
        }
        const toHTML = (categories) => `<div class="card">
                    <div class="center">
                        <a><img src=${`http://localhost:5000/${categories.imageSrc}`} data-id=${categories._id} class="responsive-img order-img" alt="PHOTO"></a>
                    </div>
                    <div class="content">
                        <h5 class="m0">${categories.name}</h5>
                    </div>
                </div>`
        this.render = () => {
            this.categoriesPage = _createCategories()
            if (this.isAddOrder) {
                this.linkOrder = document.getElementById('linkOrder')
                this.linkOrder.addEventListener('click', this.backOrder)
            }
        }
        this.render()
        this.rerender = async () => {
            const categories = await this._logic.getCategories()
            this.categoriesPage.querySelector('[data-content-card]').innerHTML = categories.map(toHTML).join('')
            this.pointCategory = document.querySelectorAll('[data-id]')
            this.completeBtn = document.getElementById('completeBtn')
            this.completeBtn.classList.add('active')
            this.pointCategory.forEach(p => p.addEventListener('click', (e) => this.openCategory(e)))
        }
        this.rerender()
    }


    this.removeChild = () => {
        const parents = document.querySelector('.content')
        if (parents.firstChild) {
            parents.removeChild(parents.firstChild)
        }
    }

    this.openCategory = (e) => {
        const id = e.target.dataset.id
        if (id) {
            this.removeChild()
            window.history.pushState({}, 'name', `?order?${id}`)
            this.isAddOrder = true
            this.render()
            this._orderPage.start(id)

        }
    }

    this.backOrder = () => {
        this.removeChild()
        window.history.pushState({}, 'name', `?order`)
        this.isAddOrder = false
        this.render()
        this.rerender()
    }
}












