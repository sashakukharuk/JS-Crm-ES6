import { Order, Category, Position, OrderPosition } from "../interface"

export class ObjectHtml {
    private toHTML: { (orders: Order): string; (categories: Category): string; (c: Category): string; (p: Position): string; (order: OrderPosition): string };
    private readonly request: () => Promise<any>;
    private readonly name: string;
    constructor(toHTML: any, request: () => Promise<any>, name: string) {
        this.toHTML = toHTML
        this.request = request
        this.name = name
    }

    async getItemInHTML() {
        const item = await this.request()
        const html = item.map(this.toHTML).join('')
        return `<div>${html.length === 0 ? `${this.name} are not` : html}<div>`
    }
}
