import {CategoriesLogic} from "./CategoriesLogic";
import '../style/modalForm.css'
import {InputControls} from "../components/inputControls/inputControls";
export function ModalForm() {
    this.name = new InputControls()
    this.cost = new InputControls()
    this._logic = new CategoriesLogic()
    this.start = (id, position, callBack) => {
        function _createModal(position) {
            const modal = document.createElement('div')
            modal.classList.add('sModal')
            modal.insertAdjacentHTML('afterbegin', `
            <div class="modalOverlay">
                <div class="modalWindow">
                    <div class="content">
                        <h4>Add position</h4>
                        <div class="field" data-input>
                            ${position ? `<input type='text' name='name'   value=${position.name}  placeholder='name' id="name"/>` : ''}
                        </div>
                        <div class="field" data-input>
                            ${position ? `<input type='number' name='cost' ${position ? `value=${position.cost}` : ''} id="cost" min="1"/>` : ''}
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
        this.modal = _createModal(position)
        this.modal.classList.add('open')
        if (!position) {
            this.name.start('name', 'text','data-input',3,10,)
            this.cost.start('cost', 'number', 'data-input')
        }

        this.cancelBtn = document.getElementById('cancel')
        this.saveBtn = document.getElementById('saveForm')

        this.cancelBtn.addEventListener('click', this.closeModal)
        this.saveBtn.addEventListener('click', () => this.confirmOrders(id, position, callBack))

    }

    this.removeChild = () => {
        const parents = document.querySelector('.sModal')
        if (parents) {
            parents.parentNode.removeChild(parents)
        }
    }

    this.closeModal = () => {
        this.modal.classList.remove('open')
        this.modal.parentNode.removeChild(this.modal)
    }

    this.disabledConfirm = () => {
        this.saveBtn.classList.add('dis')
        this.saveBtn.disabled = true
    }

    this.confirmOrders = async (id, position, callBack) => {
        this.disabledConfirm()
        const name = document.getElementById('name').value
        const cost = document.getElementById('cost').value
        !position ? await this._logic.postPosition({name, cost, category: id})
        : await this._logic.patchPosition(position._id, {name, cost})
        callBack()
        this.closeModal()
    }
}