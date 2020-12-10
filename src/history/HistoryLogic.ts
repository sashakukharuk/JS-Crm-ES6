import {HistoryData} from "./HistoryData";
import {ObjectHtml} from "../components/html/object-html";
import {Compute} from "../components/computePrice/computePrice";
import {FilterInterface, Order, OrderPosition} from "../components/interface";
import * as moment from 'moment';
import {Modal} from "../components/modal/modal";
import {Filter} from "./filter";
import {Preloader} from "../components/preloader/preloader";

export class HistoryLogic extends HistoryData {
    private isFilter: boolean
    private readonly filter: FilterInterface
    public orders: Order[]
    private preloader: Preloader;

    constructor(filter: FilterInterface) {
        super()
        this.filter = filter
        this.isFilter = true
        this.preloader = new Preloader()
    }

    async getOrders(): Promise<Order[]> {
        this.preloader.start()
        this.orders = await this.requestGetOrders(this.filter)
        this.preloader.removePreloader()
        return this.orders
    }

    async getOrdersHTML() {
        const toHTML = (orders: Order) => `<tr>
                <td>${orders.order}
                </td>
                <td>${moment(orders.date).format("YYYY-MM-DD")}</td>
                <td>${moment(orders.date).format("HH:mm")}</td>
                <td>${this.computePrice(orders.list)} $.</td>
                <td>
                    <button class="btn" data-id=${orders._id}>
                       |_/
                    </button>
                </td>
            </tr>`
        return await new ObjectHtml(toHTML, this.getOrders.bind(this), 'History').getItemInHTML()

    }

    computePrice(orders: OrderPosition[]) {
        return new Compute(orders).result()
    }

    startFilter(callback: (filter: FilterInterface) => void): void {
        this.isFilter = !this.isFilter
        if (this.isFilter) {
            const parents = document.querySelector('.filter')
            parents.parentNode.removeChild(parents)
        } else {
            const filter1 = new Filter(this.filter, {render: (filter: FilterInterface) => {
                    callback(filter)
                }})
            filter1.start()
        }
    }

    startModal(e: any): void {
        const id = e.target.dataset.id
        const orders = this.orders.find(o => o._id === id)
        new Modal('historyModal', {
                orders: orders,
                closeBtn: true
            },
            null
        ).start()
    }
}
