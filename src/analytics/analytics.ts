import {AnalyticsLogic} from "./AnalyticsLogic";
import '../style/analytics.css'
import {AnalyticsPageInterface} from "../components/interface";

export class AnalyticsPage extends AnalyticsLogic {
    constructor() {
        super();
    }
    async start() {
        function _analyticsPage(options: AnalyticsPageInterface) {
            const analytics = document.createElement('div')
            analytics.classList.add('analytics')
            analytics.insertAdjacentHTML('afterbegin', `<div class="pageTitle">
                <h4>Аналитика</h4>
            </div>
        
            <div class="averagePrice">
                <p>Средний чек <strong>${options.average ? options.average : 0} $.</strong></p>
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
        const analytics = await this.getAnalytics()
        _analyticsPage(analytics)
        this.createChart()
    }
}
