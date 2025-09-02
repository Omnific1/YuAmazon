class Cart {
    cart;
    localStoragekey;
    constructor(localStoragekey){
        this.localStoragekey = localStoragekey ;
         try {
             const storedCart = localStorage.getItem(localStoragekey);
             this.cart = storedCart ? JSON.parse(storedCart) : [];
         } catch (error) {
             console.error("Error parsing cart data, resetting cart:", error);
             this.cart = [];
             this.saveToStorage(); // Reset corrupt data
         }
    }

    saveToStorage() {
        localStorage.setItem(this.localStoragekey, JSON.stringify(this.cart));
    }
    getCartQuantity = function () {
        let cartQuantity = this.cart.reduce((total, item) => total + item.quantity, 0);
        
        return cartQuantity;
    }

    addToCart(productId,quantitySelected) {

        let itemFound = false;


        this.cart.forEach((item) => {
            if (item.productId === productId) {
                item.quantity += quantitySelected;
                itemFound = true;
            }
        })
        if (!itemFound) {
            this.cart.push({
                productId: productId,
                quantity: quantitySelected,
                deliveryOptionId: '3'

            })
        }
       this.saveToStorage();
    }

    removeItemFromCart(productId) {
         this.cart = this.cart.filter(item => item.productId !== productId);
         console.log("Item removed from cart :")
         console.log(this.cart);
         this.saveToStorage();
     }

    updateQuantityItem(productId, newQuantity) {
        this.cart.forEach((item) => {
            if (item.productId == productId) {
                 item.quantity = newQuantity;
            }
         });
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOption) {

        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].productId == productId) {
                this.cart[i].deliveryOptionId = deliveryOption;
                break;
            }
        }
        this.saveToStorage();
    }

    clearCart(){
        this.cart = [];
        this.saveToStorage();
    }
}

export let cart = new Cart('cart');

console.log(cart)


