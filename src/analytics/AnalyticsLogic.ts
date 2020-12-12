import {AnalyticsData} from "./AnalyticsData"
import {AnalyticsPageInterface} from "../components/interface"
import {Preloader} from "../components/preloader/preloader"

class Chart {
    constructor(gain: HTMLCanvasElement, param2: {data: {datasets: {backgroundColor: string; borderColor: string; data: number[]; label: string}[]; labels: string[]}; type: string}) {
        
    }

}

export class AnalyticsLogic extends AnalyticsData {
    private analytics: AnalyticsPageInterface
    private preloader: Preloader
    constructor() {
        super()
        this.preloader = new Preloader()
    }
    async getAnalytics() {
        this.preloader.start()
        this.analytics = await this.requestGetAnalytics()
        this.preloader.removePreloader()
        return this.analytics

    }
    async toHTML() {
        await this.getAnalytics()
        return `<p>Средний чек <strong>${this.analytics.average ? this.analytics.average : 0} $.</strong></p>`
    }

    createChart() {
        const ctxGain: any = document.getElementById('gain')
        const ordersGain: any = document.getElementById('orders')
        if (ctxGain || ordersGain) {
            const gain: HTMLCanvasElement = ctxGain.getContext('2d')
            const orders: HTMLCanvasElement = ordersGain.getContext('2d')
            new Chart(gain, {
                type: 'line',
                data: {
                    labels: this.analytics.chart.map(item => item.label),
                    datasets: [{
                        label: 'Gain',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: this.analytics.chart.map(item => item.gain),
                    }]
                },
            })
            new Chart(orders, {
                type: 'line',
                data: {
                    labels: this.analytics.chart.map(item => item.label),
                    datasets: [{
                        label: 'Orders',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: this.analytics.chart.map(item => item.order),
                    }]
                },
            })
        }
    }
}
