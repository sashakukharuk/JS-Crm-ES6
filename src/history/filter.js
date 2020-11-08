
export class Filter {
    constructor(filterUrl, methods) {
        this.filterUrl = filterUrl
        this.methods = methods
    }
    start() {
        const that = this
        function _createFilter() {
            const filter = document.createElement('div')
            filter.classList.add('filter')
            filter.insertAdjacentHTML('afterbegin', `
            <div class="fr" data-filter>
                <div class="field">
                    <input type="number" ${that.filterUrl && `value=${that.filterUrl.order}`} min='1' id="number">
                </div>
                <div class="field">
                    <input type="date" ${that.filterUrl && `value=${that.filterUrl.start}`} class="datepicker" id="start">
                </div>
                <div class="field">
                    <input type="date" ${that.filterUrl && `value=${that.filterUrl.end}`} class="datepicker" id="end">
                </div>
            </div>
        
            <button class="history-btn" id="filter">Применить фильтр</button>
            `)
            document.querySelector('[data-content-filter]').appendChild(filter)
            return filter
        }
        _createFilter()

        this.filterBtn = document.getElementById('filter')
        this.filterBtn.addEventListener('click', this.filterList.bind(this))
    }

    filterList() {
        const order = document.getElementById('number').value
        const start = document.getElementById('start').value
        const end = document.getElementById('end').value
        const filter = {order, start, end}
        this.methods.render(filter)
    }
}