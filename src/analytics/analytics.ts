import {AnalyticsLogic} from "./AnalyticsLogic";
import '../style/analytics.css'

export class AnalyticsPage extends AnalyticsLogic {
    private analyticsPage: HTMLDivElement;
    constructor() {
        super();
    }
    async start() {
        function _analyticsPage() {
            const analytics = document.createElement('div')
            analytics.classList.add('analytics')
            analytics.insertAdjacentHTML('afterbegin', `<div class="pageTitle">
                <h4>Аналитика</h4>
            </div>
            <div class="averagePrice" data-content-average>
            </div>
            <div class="analyticsBlock">
                <h5>Выручка</h5>
                <canvas id="gain"></canvas>
            </div>
            <div class="analyticsBlock">
                <h5>Заказы</h5>
                <canvas id="orders"></canvas>
            </div>`)
            document.querySelector('[data-content]').appendChild(analytics)
            return analytics
        }
        this.analyticsPage = _analyticsPage()
        this.analyticsPage.querySelector('[data-content-average]').innerHTML = await this.toHTML()
        this.createChart()
    }
}
