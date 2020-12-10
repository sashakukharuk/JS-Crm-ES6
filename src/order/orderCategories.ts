import {CategoriesLogic} from "../categories/CategoriesLogic"
import {UiOrderPage} from "./ui"
import '../style/orderCategories.css'
import {Preloader} from "../components/preloader/preloader"

export class OrderCategories {
    private isAddOrder: boolean
    private logic: CategoriesLogic
    private orderPage: UiOrderPage
    private linkOrder: HTMLElement
    private completeBtn: HTMLElement
    private rerender: () => Promise<void>
    private render: () => void
    private categoriesPage: any
    private pointCategory: NodeListOf<Element>
    private preloader: Preloader
    constructor() {
        this.isAddOrder = false
        this.logic = new CategoriesLogic()
        this.orderPage = new UiOrderPage()
        this.preloader = new Preloader()
    }

    start() {
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

        this.render = () => {
            this.categoriesPage = _createCategories()
            if (this.isAddOrder) {
                this.linkOrder = document.getElementById('linkOrder')
                this.linkOrder.addEventListener('click', this.backOrder.bind(this))
            }
            this.completeBtn = document.getElementById('completeBtn')
            this.completeBtn.classList.add('active')
        }
        this.render()
        this.rerender = async () => {
            this.preloader.start()
            this.categoriesPage.querySelector('[data-content-card]').innerHTML = await this.logic.getOrderCategories().then(res => {
                this.preloader.removePreloader()
                return res
            })
            this.pointCategory = document.querySelectorAll('[data-id]')
            this.pointCategory.forEach(p => p.addEventListener('click', this.openCategory.bind(this)))
        }
        this.rerender()
    }

    openCategory(e: any) {
        const id = e.target.dataset.id
        if (id) {
            this.logic.removeChild()
            window.history.pushState({}, 'name', `/order/${id}`)
            this.isAddOrder = true
            this.render()
            this.orderPage.start()

        }
    }

    backOrder() {
        this.logic.removeChild()
        window.history.pushState({}, 'name', `/order`)
        this.isAddOrder = false
        this.render()
        this.rerender()
    }
}












