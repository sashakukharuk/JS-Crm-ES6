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
    async getOverview(): Promise<OverviewPageInterface> {
        this.preloader.start()
        this.overview = await this.requestGetOverview()
        this.preloader.removePreloader()
        return this.overview
    }
    getData(): any {
        const o_date = new Intl.DateTimeFormat
        const f_date = (m_ca: any, m_it: { type: any; value: any; }) => Object({...m_ca, [m_it.type]: m_it.value})
        const m_date = o_date.formatToParts().reduce(f_date, {})
        return (m_date.day - 1) + '-' + m_date.month + '-' + m_date.year
    }
}
