import {CategoriesLogic} from "./CategoriesLogic";
import {ModalForm} from "./modalForm";
import '../style/position.css'

export function PositionPage() {
    this._modal = new ModalForm()
    this._logic = new CategoriesLogic()
    this.start = (id) => {
        function _createPosition() {
            const position = document.createElement('div')
            position.classList.add('position')
            position.insertAdjacentHTML('afterbegin', `
            <div class="pageSubtitle">
                <h4>Positions:</h4>
                <button id="addPosit">
                    Add positions
                </button>
            </div>
            <div data-content-position></div>
            `)
            document.querySelector('[data-content-category]').appendChild(position)
            return position
        }

        this.toHTML = (p) => `
        <div class="position-collection">
            <div data-modal="true" data-id=${p._id}   class="position">
                <span>
                    ${p.name} <strong>${p.cost} uah.</strong>
                </span>
            </div>
            <div class="deletePosition">
                <button data-id=${p._id} id=${p._id}>
                   delete
                </button>
            </div>
        </div>`

        this.positionPage = _createPosition()

        this.render = async () => {
            if (id) {
                const position = await this._logic.getPositions(id)
                this.positionPage.querySelector('[data-content-position]').innerHTML = position.map(this.toHTML).join('')
                this.positionPage.querySelector('[data-content-position]').innerHTML = position.map(this.toHTML).join('')
                this.addPosBtn = document.getElementById('addPosit')
                this.deletePosBtn = document.querySelectorAll('.deletePosition')
                this.addPosBtn.addEventListener('click', () => this.addPosOpenModal(id))
                this.deletePosBtn.forEach(d => d.addEventListener('click', this.deletePosition))
                this.positionPage.addEventListener('click', (e) => this.createPosOpenModal(e, id, position))
            }
        }
        this.render()
    }

    this.addPosOpenModal = (id) => {
        const position = null
        this._modal.start(id, position, () => this.render())
    }

    this.createPosOpenModal = (e, id, positions) => {
        const modal = e.target.dataset.modal
        if (modal) {
            const idPos = e.target.dataset.id
            const position = positions.find(p => p._id === idPos)
            this._modal.start(id, position, () => this.render())
        }
    }

    this.disabledBtnDelete = (id) => {
        const deletePosBtn = document.getElementById(`${id}`)
        deletePosBtn.classList.add('active')
        deletePosBtn.disabled = true
    }

    this.deletePosition = async (e) => {
        const id = e.target.dataset.id
        this.disabledBtnDelete(id)
        await this._logic.removePosition(id)
        this.render()
    }
}







