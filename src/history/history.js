import {HistoryLogic} from "./HistoryLogic";
import {Filter} from './filter'
import '../style/history.css'
import {Compute} from "../components/computePrice/computePrice";
import {Modal} from "../components/modal/modal";

export function HistoryPage() {
    // this._compute = new Compute()
    this.orders = []
    this._logic = new HistoryLogic()
    this._filter = new Filter()
    this._isFilter = false
    this.start = () => {
        const that = this
        function _historyPage() {
            const history = document.createElement('div')
            history.classList.add('history')
            history.insertAdjacentHTML('afterbegin', `<div class="page-title">
                <h4>История заказов</h4>
                <button class="history-btn" id="openFilter">
                    filter
                </button>
            </div>
            <div data-content-filter></div>
            <table class="table">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Сумма</th>
                    <th></th>
                </tr>
                </thead>
            
                <tbody data-content>
                </tbody>
            </table>
            
            <div class="history-btn">
                <button class="history-btn" id="load">Загрузить еще</button>
            </div>`)
            document.querySelector('[data-content]').appendChild(history)
            return history
        }

        this.toHTML = (orders) => `<tr>
                <td>${orders.order}
                </td>
                <td>${moment(orders.date).format("YYYY-MM-DD")}</td>
                <td>${moment(orders.date).format("HH:mm")}</td>
                <td>${that.computePrice(orders.list)} $.</td>
                <td>
                    <button class="btn" data-id=${orders._id}>
                       |_/
                    </button>
                </td>
            </tr>`

        this.historyPage = _historyPage()
        this._isFilter = false
        this.render = async (filter, STEP) => {
            this.orders = await this._logic.getOrders(filter, STEP)
            this.historyPage.querySelector('[data-content]').innerHTML = this.orders.map(order => this.toHTML(order)).join('')

            this.loadBtn = document.getElementById('load')
            this.openFilterBtn = document.getElementById('openFilter')
            this.listBtn = document.querySelectorAll('[data-id]')

            this.loadBtn.addEventListener('click', this.listenerLoad)
            this.listBtn.forEach(list => list.addEventListener('click', this.openModal))
            this.openFilterBtn.addEventListener('click', this.openFilter)
        }
        this.render()
    }

    this.computePrice = (orders) => {
        this.compute = new Compute(orders)
        return this.compute.result()
    }

    this.openFilter = () => {
        if (this._isFilter) {
            const parents = document.querySelector('.filter')
            parents.parentNode.removeChild(parents)
            this._isFilter = false
        } else {
            const filterUrl = this._logic.showFilter()
            this._filter.start(filterUrl, (filter) => this.render(filter))
            this._isFilter = true
        }
    }

    this.listenerLoad = () => {
        const STEP = 3
        this.render(null, STEP)
    }

    this.openModal = (e) => {
        const id = e.target.dataset.id
        const orders = this.orders.find(o => o._id === id)
        this._modal = new Modal('historyModal',{
            orders: orders,
            closeBtn: true
        })
        this._modal.start()
    }
}















