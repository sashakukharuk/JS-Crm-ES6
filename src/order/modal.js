import {LogicOrderPage} from "./logic";
import '../style/modal.css'
import {Compute} from "../components/computePrice/computePrice";
export function Modal() {
    this._compute = new Compute()
    this._logic = new LogicOrderPage()
    this.start = function (options, methods) {
        const that = this
        function _createModal(options) {
            const modal = document.createElement('div')
            modal.classList.add('sModal')
            modal.insertAdjacentHTML('afterBegin', `
                <div class="modalOverlay">
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
                                <p>Общая стоимость <strong>${options ? that.computePrice(options.orders) : 0}$.</strong></p>
                            </div>
                        </div>
                        ${options.closeBtn ? `<div class="footer"><button class="btnLeft" data-close="true" id="cancel">Close</button></div>`
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

        const toHTML = (o, options) => `<tr>
            <td>${o.name}</td>
            <td>${o.quantity}</td>
            <td>${o.cost} $.</td>
            ${options.closeBtn ? '' : `<td><button class="deleteBtn" data-id=${o._id}>delete</button></td>`}
        </tr>`

        this.createModal = (options) => {
            this.removeChild()
            this.order = _createModal(options)
            this.order.classList.add('open')
            this.cancelBtn = document.getElementById('cancel')
            this.cancelBtn.addEventListener('click', () => this.closeModal(methods))
            this.order.addEventListener('click', (event) => this.deleteOrder(event, render, methods))
        }

        const render = async (options) => {
            this.createModal(options)
            this.order.querySelector('[data-content]').innerHTML = options.orders.list.map(o => toHTML(o, options)).join('')

            if (!options.closeBtn) {
                this.confirm = document.getElementById('confirm')
                this.confirm.addEventListener('click', () => this.confirmOrders(methods))
            }
        }
        render(options)
    }

    this.removeChild = () => {
        const parents = document.querySelector('.sModal')
        if (parents) {
            parents.parentNode.removeChild(parents)
        }
    }

    this.computePrice = (orders) => {
        return this._compute.result(orders)
    }

    this.closeModal = (methods) => {
        this.order.classList.remove('open')
        this.order.parentNode.removeChild(this.order)
        methods && methods.clear()
    }

    this.confirmOrders = (methods) => {
        this.closeModal()
        methods.post()
        methods.clear()
    }

    this.deleteOrder = async (event, render, methods) => {
        const id = event.target.dataset.id
        if (id) {
            const orders = await methods.deleteOrder(id)
            this.removeChild()
            render({orders: {list: orders}, closeBtn: false})
        }
    }
}


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