// import { products } from "./products";

class Orders {
    orders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
    }
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.orders))
    }

    add(order) {
        this.orders.unshift(order);
        this.saveToStorage();
    }

    searchOrder(orderId){
        if(!orderId){
            console.error('Order Id is invalid');
        }

        this.orders.forEach(order => {
            if(order.id === orderId){
                console.log(`Order Found`);
                console.log(order);
                return order;
            }
        });
        console.error('NotFound');
    }

    searchOrder(orderId, productId = null) {
        if (!orderId) {
            console.error('Order Id is invalid');
            return null;
        }

        let foundOrder = null;

        for (let order of this.orders) {
            if (order.id === orderId) {
                foundOrder = order;
                break;
            }
        }

        if (!foundOrder) {
            console.error('Order NOT FOUND');
            return null;
        }

        // If only searching for order
        if (!productId) {
            console.log('Order Found:', foundOrder);
            return foundOrder;
        }

        // If searching for product within the order
        if (!foundOrder.products || !Array.isArray(foundOrder.products)) {
            console.error('No products found in the order');
            return null;
        }

        for (let product of foundOrder.products) {
            if (product.productId === productId) {
                console.log('Product Found:', product);
                return product;
            }
        }

        console.error('Product NOT FOUND in the order');
        return null;
    }
}

export let orders = new Orders('orders');