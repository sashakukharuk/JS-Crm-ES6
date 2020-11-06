export class Compute {
    constructor(item) {
        this.item = item
    }

    result() {
        return this.item.reduce((total, item) => {
            return total += item.quantity * item.cost
        }, 0)
    }
}