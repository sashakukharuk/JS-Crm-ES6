import '../../style/modal.css'
import {Compute} from "../computePrice/computePrice";

export class Modal {
    constructor(name, options, methods) {
        this.name = name
        this.options = options
        this.methods = methods
    }

    start() {
        const that = this
        function _createModal() {
            const modal = document.createElement('div')
            modal.classList.add('sModal')
            modal.insertAdjacentHTML('afterBegin', `
                <div class="modalOverlay" id=${that.name}>
                    <div class="modalWindow">
                        <div class="content">
                            <h4 class="mb1">Ваш заказ</h4>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Количество</th>
                                    <th>Цена</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody data-content>
                                </tbody>
                            </table>
                            <div class="orderSummary">
                                <p>Общая стоимость <strong data-price></strong></p>
                            </div>
                        </div>
                        ${that.options.closeBtn ? `<div class="footer"><button class="btnLeft" data-close="true" id="cancel">Close</button></div>`
                : `<div class="footer">
                            <button class="btnLeft" data-close="true" id="cancel">Cancel</button>
                            <button class="btnRight" data-confirm="true" id="confirm">Confirm</button>
                        </div> `}
                    </div>
                </div>
            `)
            document.body.appendChild(modal)
            return modal
        }
        this.removeChild()
        this.modal = _createModal()
        this.modal.classList.add('open')
        const el = document.querySelector('#' + this.name)
        this.cancelBtn = el.querySelector('.btnLeft')
        this.cancelBtn.addEventListener('click', this.closeModal.bind(this))
        this.modal.addEventListener('click', this.deleteOrder.bind(this))

        this.render()

        if (!this.options.closeBtn) {
            this.confirm = el.querySelector('.btnRight')
            this.confirm.addEventListener('click', this.confirmOrders.bind(this))
        }
    }

    toHTML(o) {
        return `<tr>
            <td>${o.name}</td>
            <td>${o.quantity}</td>
            <td>${o.cost} $.</td>
            ${this.options.closeBtn ? '' : `<td><button class="deleteBtn" data-id=${o._id}>delete</button></td>`}
        </tr>`
    }

    render() {
        this.modal.querySelector('[data-content]').innerHTML = this.options.orders.list.map(o => this.toHTML(o)).join('')
        this.modal.querySelector('[data-price]').innerHTML = `<strong>${this.options.orders.list ? this.computePrice(this.options.orders.list) : 0}$.</strong>`
    }

    computePrice = (orders) => {
        this.compute = new Compute(orders)
        return this.compute.result()
    }

    removeChild() {
        const parents = document.querySelector('.sModal')
        if (parents) {
            parents.parentNode.removeChild(parents)
        }
    }

    closeModal() {
        this.modal.classList.remove('open')
        this.removeChild()
        this.methods && this.methods.clear()
    }

    confirmOrders() {
        this.methods.post()
        this.closeModal()
    }

    async deleteOrder(event) {
        const id = event.target.dataset.id
        if (id) {
            this.options.orders.list = await this.methods.deleteOrder(id)
            this.render()
        }
    }
}

// export function Modal() {
//     this._compute = new Compute()
//     this._logic = new LogicOrderPage()
//     this.start = function (options, methods) {
//         const that = this
//         function _createModal(options) {
//             const modal = document.createElement('div')
//             modal.classList.add('sModal')
//             modal.insertAdjacentHTML('afterBegin', `
//                 <div class="modalOverlay">
//                     <div class="modalWindow">
//                         <div class="content">
//                             <h4 class="mb1">Ваш заказ</h4>
//                             <table class="table">
//                                 <thead>
//                                 <tr>
//                                     <th>Название</th>
//                                     <th>Количество</th>
//                                     <th>Цена</th>
//                                     <th></th>
//                                 </tr>
//                                 </thead>
//                                 <tbody data-content>
//                                 </tbody>
//                             </table>
//                             <div class="orderSummary">
//                                 <p>Общая стоимость <strong>${options ? that.computePrice(options.orders) : 0}$.</strong></p>
//                             </div>
//                         </div>
//                         ${options.closeBtn ? `<div class="footer"><button class="btnLeft" data-close="true" id="cancel">Close</button></div>`
//                         : `<div class="footer">
//                             <button class="btnLeft" data-close="true" id="cancel">Cancel</button>
//                             <button class="btnRight" data-confirm="true" id="confirm">Confirm</button>
//                         </div> `}
//                     </div>
//                 </div>
//             `)
//             document.body.appendChild(modal)
//             return modal
//         }
//
//         const toHTML = (o, options) => `<tr>
//             <td>${o.name}</td>
//             <td>${o.quantity}</td>
//             <td>${o.cost} $.</td>
//             ${options.closeBtn ? '' : `<td><button class="deleteBtn" data-id=${o._id}>delete</button></td>`}
//         </tr>`
//
//         this.createModal = (options) => {
//             this.removeChild()
//             this.order = _createModal(options)
//             this.order.classList.add('open')
//             this.cancelBtn = document.getElementById('cancel')
//             this.cancelBtn.addEventListener('click', () => this.closeModal(methods))
//             this.order.addEventListener('click', (event) => this.deleteOrder(event, render, methods))
//         }
//
//         const render = async (options) => {
//             this.createModal(options)
//             this.order.querySelector('[data-content]').innerHTML = options.orders.list.map(o => toHTML(o, options)).join('')
//
//             if (!options.closeBtn) {
//                 this.confirm = document.getElementById('confirm')
//                 this.confirm.addEventListener('click', () => this.confirmOrders(methods))
//             }
//         }
//         render(options)
//     }
//
//     this.removeChild = () => {
//         const parents = document.querySelector('.sModal')
//         if (parents) {
//             parents.parentNode.removeChild(parents)
//         }
//     }
//
//     this.computePrice = (orders) => {
//         return this._compute.result(orders)
//     }
//
//     this.closeModal = (methods) => {
//         this.order.classList.remove('open')
//         this.order.parentNode.removeChild(this.order)
//         methods && methods.clear()
//     }
//
//     this.confirmOrders = (methods) => {
//         this.closeModal()
//         methods.post()
//         methods.clear()
//     }
//
//     this.deleteOrder = async (event, render, methods) => {
//         const id = event.target.dataset.id
//         if (id) {
//             const orders = await methods.deleteOrder(id)
//             this.removeChild()
//             render({orders: {list: orders}, closeBtn: false})
//         }
//     }
// }


// $.modal = function (options) {
//     const ANIMATION_SPEED = 200
//     const $modal = _createModal(options)
//     const complete = document.getElementById('onBtn')
//     let closing = false
//     let destroyed = true
//
//     const modal = {
//         open() {
//             if (destroyed) {
//                 !closing && $modal.classList.add('open')
//             }
//         },
//         close() {
//             closing = true
//             $modal.classList.remove('open')
//             $modal.classList.add('hide')
//             setTimeout(()=> {
//                 $modal.classList.remove('hide')
//                 closing = false
//             }, ANIMATION_SPEED)
//         }
//     }
//
//     const listener = (event) => {
//         if (event.target.dataset.close) {
//             return modal.close()
//         } else if (event.target.dataset.open) {
//             return modal.open()
//         }
//     }
//
//     complete.addEventListener('click', listener)
//     $modal.addEventListener('click', listener)
//
//     return Object.assign(modal, {
//         destroy() {
//             $modal.parentNode.removeChild($modal)
//             $modal.removeEventListener("click", listener)
//             destroyed = true
//         },
//         // setContent(html) {
//         //     $modal.querySelector('#orders').innerHTML = html
//         // }
//     })
// }
//
// $.order = function (options) {
//     const $order = _createOrderPage(options)
//     // return Object.assign(order, {
//     //     setContent(html) {
//     //         $order.querySelector('[data-content]').innerHTML = html
//     //     }
//     // })
// }