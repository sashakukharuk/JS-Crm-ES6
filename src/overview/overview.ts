import {OverviewLogic} from "./OverviewLogic";
import '../style/overview.css'

export class OverviewPage extends OverviewLogic {
    private pageOverview: HTMLDivElement;
    constructor() {
        super()
    }
    async start() {
        function _overviewPage(data: Date) {
            const overview = document.createElement('div')
            overview.classList.add('overview')
            overview.insertAdjacentHTML('afterbegin', `<div class="page-title">
                <h4>
                    Обзор за вчера (${data})
                </h4>
            </div>
            <div class="block-overview" data-content-overview>
            </div>`)
            document.querySelector('[data-content]').appendChild(overview)
            return overview
        }

        const data: Date = this.getData()
        this.pageOverview = _overviewPage(data)
        if (this.pageOverview) {
            this.pageOverview.querySelector('[data-content-overview]').innerHTML = await this.toHTML()
        }
    }
}





















