import {OverviewData} from "./OverviewData";
import {OverviewPageInterface} from "../components/interface";
import {Preloader} from "../components/preloader/preloader";

export class OverviewLogic extends OverviewData {
    private overview: OverviewPageInterface;
    private preloader: Preloader;
    constructor() {
        super()
        this.preloader = new Preloader()
    }
    async getOverview(): Promise<void> {
        this.preloader.start()
        this.overview = await this.requestGetOverview()
        this.preloader.removePreloader()
    }
     async toHTML() {
        await this.getOverview()
        return `<div class="block-gain">
            <span>Выручка:</span>
            <h4>${this.overview.gain.compare} руб.</h4>
            <h4 ${this.overview.gain.isHigher ? `style="color: green"` : `style="color:red"`}>
                <i> ${this.overview.gain.isHigher ? 'up' : 'dawn'}</i>
                ${this.overview.gain.parecent}%
            </h4>
            <p>Выручка вашего бизнеса вчера на ${this.overview.gain.parecent}% выше среднего: ${this.overview.gain.yesterday} руб. в день</p>
        </div>
        <div class="block-order">
            <span class="card-title">Заказы:</span>
            <h4>${this.overview.orders.compare} зак.</h4>
            <h4 ${this.overview.orders.isHigher ? `style="color: green"` : `style="color: red"`}>
                <i class="material-icons">${this.overview.orders.isHigher ? 'up' : 'dawn'}</i>
                ${this.overview.orders.parecent}%
            </h4>
            <p>Число заказов вчера на ${this.overview.orders.parecent}% ниже среднего значения: ${this.overview.orders.yesterday} зак. в день}</p>
        </div>`
    }


    getData(): any {
        const o_date = new Intl.DateTimeFormat
        const f_date = (m_ca: any, m_it: { type: any; value: any; }) => Object({...m_ca, [m_it.type]: m_it.value})
        const m_date = o_date.formatToParts().reduce(f_date, {})
        return (m_date.day - 1) + '-' + m_date.month + '-' + m_date.year
    }
}
