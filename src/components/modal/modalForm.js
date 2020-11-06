import '../../style/modalForm.css'
import {Input} from "../inputControls/inputControls";

export class ModalForm {
    constructor(position, methods) {
        this.position = position
        this.methods = methods
        this.name = new Input('name', 'text','data-input',3,10,)
        this.cost = new Input('cost', 'number', 'data-input')
    }

    start = () => {
        const that = this
        function _createModal() {
            const modal = document.createElement('div')
            modal.classList.add('sModal')
            modal.insertAdjacentHTML('afterbegin', `
            <div class="modalOverlay">
                <div class="modalWindow">
                    <div class="content">
                        <h4>Add position</h4>
                        <div class="field" data-input>
                            ${that.position ? `<input type='text' name='name'   value=${that.position.name}  placeholder='name' id="name"/>` : ''}
                        </div>
                        <div class="field" data-input>
                            ${that.position ? `<input type='number' name='cost' ${that.position ? `value=${that.position.cost}` : ''} id="cost" min="1"/>` : ''}
                        </div>
                    </div>
                    <div class="footer">
                        <button class="btnLeft" id="cancel">
                            Cancel
                        </button>
                        <button class="btnRight" id="saveForm">
                            Save
                        </button>
                    </div>
                </div>
            </div>`)
            document.body.appendChild(modal)
            return modal
        }
        this.removeChild()
        this.modal = _createModal()
        this.modal.classList.add('open')
        if (!this.position) {
            this.name.start()
            this.cost.start()
        }

        this.cancelBtn = document.getElementById('cancel')
        this.saveBtn = document.getElementById('saveForm')

        this.cancelBtn.addEventListener('click', this.closeModal.bind(this))
        this.saveBtn.addEventListener('click', this.confirmOrders.bind(this))

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
    }

    disabledConfirm() {
        this.saveBtn.classList.add('dis')
        this.saveBtn.disabled = true
    }

    async confirmOrders() {
        this.disabledConfirm()
        const name = document.getElementById('name').value
        const cost = document.getElementById('cost').value
        await this.methods.post(name, cost)
        this.methods.render()
        this.closeModal()
    }
}