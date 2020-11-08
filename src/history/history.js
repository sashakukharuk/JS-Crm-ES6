import {HistoryLogic} from "./HistoryLogic";
import {Filter} from './filter'
import '../style/history.css'
import {Compute} from "../components/computePrice/computePrice";
import {Modal} from "../components/modal/modal";

export class HistoryPage {
    constructor() {
        this.orders = []
        this._isFilter = false
        this.filter = {offset: 0, limit: 7, order: '', start: '', end: ''}
    }

    async start() {
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
        this.render = async (filter) => {
            this._logic = new HistoryLogic(filter)
            this.orders = await this._logic.getOrders()
            this.historyPage.querySelector('[data-content]').innerHTML = this.orders.map(order => this.toHTML(order)).join('')
            this.listBtn = document.querySelectorAll('[data-id]')
            this.listBtn.forEach(list => list.addEventListener('click', this.openModal.bind(this)))
        }
        this.loadBtn = document.getElementById('load')
        this.openFilterBtn = document.getElementById('openFilter')
        this.loadBtn.addEventListener('click', this.listenerLoad.bind(this))
        this.openFilterBtn.addEventListener('click', this.openFilter.bind(this))


        await this.render(this.filter)
    }

    computePrice(orders) {
        this.compute = new Compute(orders)
        return this.compute.result()
    }

    async openFilter() {
        if (this._isFilter) {
            const parents = document.querySelector('.filter')
            parents.parentNode.removeChild(parents)
            this._isFilter = false
        } else {
            this._filter = new Filter(this.filter, {render: (filter) => {
                this.filter = filter
                this.render(this.filter)
                }})
            this._filter.start()
            this._isFilter = true
        }
    }

    async listenerLoad() {
        this.filter.limit += 3
        await this.render(this.filter)
    }

    openModal(e) {
        const id = e.target.dataset.id
        const orders = this.orders.find(o => o._id === id)
        this._modal = new Modal('historyModal',{
            orders: orders,
            closeBtn: true
        })
        this._modal.start()
    }
}















