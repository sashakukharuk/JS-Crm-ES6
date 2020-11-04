import {AnalyticsLogic} from "./AnalyticsLogic";
import '../style/analytics.css'

export function AnalyticsPage() {
    this._logic = new AnalyticsLogic()
    this.start = async () => {
        function _analyticsPage(options) {
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
        this.render = async () => {
            const analytics = await this._logic.getAnalytics()
            _analyticsPage(analytics)
            const gain = document.getElementById('gain').getContext('2d');
            const orders = document.getElementById('orders').getContext('2d');
            new Chart(gain, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: analytics.chart.map(item => item.label),
                    datasets: [{
                        label: 'Gain',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: analytics.chart.map(item => item.gain),
                    }]
                },

                // Configuration options go here
                options: {}
            });

            new Chart(orders, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: analytics.chart.map(item => item.label),
                    datasets: [{
                        label: 'Orders',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: analytics.chart.map(item => item.order),
                    }]
                },

                // Configuration options go here
                options: {}
            });

        }
        await this.render()
    }



}