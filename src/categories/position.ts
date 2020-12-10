import {CategoriesLogic} from "./CategoriesLogic";
import '../style/position.css'
import {Preloader} from "../components/preloader/preloader";
import {Position} from "../components/interface";

export class PositionPage extends CategoriesLogic {
    private preloader: Preloader;
    private positionPage: HTMLDivElement;
    private render: () => Promise<void>;
    private addPosBtn: HTMLElement;
    private deletePosBtn: NodeListOf<Element>;
    constructor() {
        super()
        this.preloader = new Preloader()
    }

    start(id: string) {
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
            <div data-content-collection-position></div>
            `)
            document.querySelector('[data-content-position]').appendChild(position)
            return position
        }

        this.positionPage = _createPosition()

        this.render = async () => {
            if (id) {
                const position = await this.getPositions(id)
                this.positionPage.querySelector('[data-content-collection-position]').innerHTML = await this.getPositionsHTML(id)

                this.addPosBtn = document.getElementById('addPosit')
                this.deletePosBtn = document.querySelectorAll('.deletePosition')

                this.addPosBtn && this.addPosBtn.addEventListener('click', () => this.createPos(id))
                this.deletePosBtn.forEach(d => d.addEventListener('click', this.deletePosition.bind(this)))
                this.positionPage.addEventListener('click', (e) => this.updatePos(e, id, position))
            }
        }
        this.render()
    }

    createPos(id: string) {
        this.openModal(this.postPosition.bind(this), this.render, null, null, id)
    }

    updatePos(e: any, id: string, positions: Position[]) {
        const modal = e.target.dataset.modal
        if (modal) {
            const idPos = e.target.dataset.id
            const position = positions.find(p => p._id === idPos)
            this.openModal(this.patchPosition.bind(this), this.render, position, position._id, null)
        }
    }

    async deletePosition(e: any) {
        const id = e.target.dataset.id
        this.disabledBtnDelete(id)
        await this.removePosition(id)
        this.render()
    }
}







