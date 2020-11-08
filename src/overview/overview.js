import {OverviewLogic} from "./OverviewLogic";
import '../style/overview.css'
export class OverviewPage extends OverviewLogic {
    constructor() {
        super()
    }
    async start() {
        function _overviewPage(options) {
            const overview = document.createElement('div')
            overview.classList.add('overview')
            overview.insertAdjacentHTML('afterbegin', `<div class="page-title">
                <h4>
                    Обзор за вчера (${options.data})
                </h4>
            </div>
            
            <div class="block-overview">
                
                <div class="block-gain">
                    <span>Выручка:</span>
                    <h4>${options.overview.gain.compare} руб.</h4>
                    <h4 ${options.overview.gain.isHigher ? `style="color: green"` : `style="color:red"`}>
                        <i> ${options.overview.gain.isHigher ? 'up' : 'dawn'}</i>
                        ${options.overview.gain.parecent}%
                    </h4>
                    <p>Выручка вашего бизнеса вчера на ${options.overview.gain.parecent}% выше среднего: ${options.overview.gain.yesterday} руб. в день</p>
                </div>
               
            
                
                <div class="block-order">
                    <span class="card-title">Заказы:</span>
                    <h4>${options.overview.orders.compare} зак.</h4>
                    <h4 ${options.overview.orders.isHigher ? `style="color: green"` : `style="color: red"`}>
                        <i class="material-icons">${options.overview.orders.isHigher ? 'up' : 'dawn'}</i>
                        ${options.overview.orders.parecent}%
                    </h4>
                    <p>Число заказов вчера на ${options.overview.orders.parecent}% ниже среднего значения: ${options.overview.orders.yesterday} зак. в день}</p>
                </div>
                
            </div>`)
            document.querySelector('[data-content]').appendChild(overview)
            return overview
        }


        const overview = await this.getOverview()

        const o_date = new Intl.DateTimeFormat;
        const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
        const m_date = o_date.formatToParts().reduce(f_date, {});
        const data = (m_date.day - 1) + '-' + m_date.month + '-' + m_date.year;
        _overviewPage({overview, data})
    }
}






















