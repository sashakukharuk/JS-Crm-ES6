import {HistoryLogic} from "./HistoryLogic";

export function Filter() {
    this._logic = new HistoryLogic()
    this.start = (filterUrl, callback) => {
        function _createFilter() {
            const filter = document.createElement('div')
            filter.classList.add('filter')
            filter.insertAdjacentHTML('afterbegin', `
            <div class="fr" data-filter>
                <div class="field">
                    <input type="number" ${filterUrl && `value=${filterUrl.order}`} min="1" id="number">
                </div>
                <div class="field">
                    <input type="date" ${filterUrl && `value=${filterUrl.start}`} class="datepicker" id="start">
                </div>
                <div class="field">
                    <input type="date" ${filterUrl && `value=${filterUrl.end}`} class="datepicker" id="end">
                </div>
            </div>
        
            <button class="history-btn" id="filter">Применить фильтр</button>
            `)
            document.querySelector('[data-content-filter]').appendChild(filter)
            return filter
        }
        _createFilter()

        this.filterBtn = document.getElementById('filter')
        this.filterBtn.addEventListener('click', () => this.filterList(callback))
    }

    this.filterList = (callback) => {
        const order = document.getElementById('number').value
        const start = document.getElementById('start').value
        const end = document.getElementById('end').value
        const filter = {order, start, end}
        callback(filter)
    }
}