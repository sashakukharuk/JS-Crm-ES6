import {OrderPosition} from "../interface"

export class Compute {
    private item: OrderPosition[];
    constructor(item: OrderPosition[]) {
        this.item = item
    }

    result() {
        return this.item.reduce((total, item): number => {
            total += item.quantity * item.cost
            return total
        }, 0)
    }
}
