import '../../style/modalForm.css'
import {Input} from "../inputControls/inputControls";
import { Position } from '../interface';

export class ModalForm {
    private position: Position;
    private methods: { post: (name: string, cost: number) => any; render: () => void };
    private name: Input;
    private cost: Input;
    private modal: HTMLDivElement;
    private cancelBtn: HTMLElement;
    private saveBtn: any;
    private value: string;
    constructor(position: Position, methods: { post: (name: string, cost: number) => any; render: () => void; }) {
        this.position = position
        this.methods = methods
        this.value = String(this.position && this.position.cost)
        this.name = new Input('position', 'text','data-name',4,11, this.position && this.position.name)
        this.cost = new Input('cost', 'number', 'data-input-cost', null, null, this.value)
    }

    start = () => {
        function _createModal() {
            const modal = document.createElement('div')
            modal.classList.add('sModal')
            modal.insertAdjacentHTML('afterbegin', `
            <div class="modalOverlay">
                <div class="modalWindow">
                    <div class="content">
                        <h4>Add position</h4>
                        <div class="field" data-name>
                        </div>
                        <div class="field" data-input-cost>
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

        this.name.start()
        this.cost.start()

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
        const nameElement: any = document.getElementById('position')
        const costElement: any = document.getElementById('cost')
        const name: string = nameElement.value
        const cost: number = costElement.value
        await this.methods.post(name, cost)
        this.methods.render()
        this.closeModal()
    }
}
