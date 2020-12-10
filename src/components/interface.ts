export interface User {
    email: string
    password: string
}

export interface Message {
    message: string
}

export interface Category {
    name: string
    imageSrc?: string
    user?: string
    _id?: string
}

export interface NewCategory {
    name: string
    file: File
}

export interface Position {
    name: string
    cost: number
    user?: string
    category?: string
    _id?: string
    quantity?: number
}

export interface Order {
    date?: Date
    order?: number
    user?: string
    list: OrderPosition[]
    _id?: string
}

export interface OrderPosition {
    name: string
    cost: number
    quantity: number
    _id?: string
}

export interface FilterInterface {
    offset?: number
    limit?: number
    start?: number
    end?: Date
    order?: Date
}

export interface OverviewPageInterface {
    orders: OverviewPageItem
    gain: OverviewPageItem
}

export interface OverviewPageItem {
    parecent: number
    compare: number
    yesterday: number
    isHigher: boolean
}

export interface AnalyticsPageInterface {
    average: number
    chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
    gain: number
    order: number
    label: string
}
