import {HistoryLogic} from "./HistoryLogic";
import '../style/history.css'
import {FilterInterface} from "../components/interface";

export class HistoryPage {
    private readonly filter: FilterInterface
    private historyPage: HTMLDivElement;
    private render: (filter: FilterInterface) => Promise<void>;
    private listBtn: NodeListOf<Element>;
    private loadBtn: HTMLElement;
    private openFilterBtn: HTMLElement;
    private logic: HistoryLogic;

    constructor() {
        this.filter = {offset: 0, limit: 7}
    }

    async start() {
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

        this.historyPage = _historyPage()

        this.render = async (filter) => {
            this.logic = new HistoryLogic(filter)
            this.historyPage.querySelector('[data-content]').innerHTML = await this.logic.getOrdersHTML()
            this.listBtn = document.querySelectorAll('[data-id]')
            this.listBtn.forEach(list => list.addEventListener('click', this.openModal.bind(this)))
        }
        this.loadBtn = document.getElementById('load')
        this.openFilterBtn = document.getElementById('openFilter')
        this.loadBtn.addEventListener('click', this.listenerLoad.bind(this))
        this.openFilterBtn.addEventListener('click', this.openFilter.bind(this))
        await this.render(this.filter)
    }

    async openFilter() {
        this.logic.startFilter((filter: FilterInterface) => {
            this.render(filter)
        })
    }

    async listenerLoad() {
        this.filter.limit += 3
        await this.render(this.filter)
    }

    openModal(e: any) {
        this.logic.startModal(e)
    }
}
