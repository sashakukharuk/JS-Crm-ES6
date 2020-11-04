export function Compute() {
    this.result = (orders) => {
        return orders.list.reduce((total, item) => {
            return total += item.quantity * item.cost
        }, 0)
    }
}
