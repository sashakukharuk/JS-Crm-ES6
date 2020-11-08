import {CategoriesLogic} from "./CategoriesLogic";
import '../style/position.css'
import {ModalForm} from "../components/modal/modalForm";

export class PositionPage extends CategoriesLogic {
    constructor() {
        super()
    }

    start(id) {
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
                const position = await this.getPositions(id)
                this.positionPage.querySelector('[data-content-position]').innerHTML = position.map(this.toHTML).join('')
                this.positionPage.querySelector('[data-content-position]').innerHTML = position.map(this.toHTML).join('')

                this.addPosBtn = document.getElementById('addPosit')
                this.deletePosBtn = document.querySelectorAll('.deletePosition')

                this.addPosBtn.addEventListener('click', () => this.createPos(id))
                this.deletePosBtn.forEach(d => d.addEventListener('click', this.deletePosition.bind(this)))
                this.positionPage.addEventListener('click', (e) => this.updatePos(e, id, position))
            }
        }
        this.render()
    }

    openModal(logicFunction, renderFunction, position, positionId, categoryId) {
        this._modal = new ModalForm(position, {
            post: (name, cost) => logicFunction(positionId, name, cost, categoryId),
            render: () => renderFunction()
        })
        this._modal.start()
    }

    createPos(id) {
        this.openModal(this.postPosition.bind(this), this.render, null, null, id)
    }

    updatePos(e, id, positions) {
        const modal = e.target.dataset.modal
        if (modal) {
            const idPos = e.target.dataset.id
            const position = positions.find(p => p._id === idPos)
            this.openModal(this.patchPosition.bind(this), this.render, position, position._id, null)
        }
    }

    disabledBtnDelete(id) {
        const deletePosBtn = document.getElementById(`${id}`)
        deletePosBtn.classList.add('active')
        deletePosBtn.disabled = true
    }

    async deletePosition(e) {
        const id = e.target.dataset.id
        this.disabledBtnDelete(id)
        await this.removePosition(id)
        this.render()
    }
}







