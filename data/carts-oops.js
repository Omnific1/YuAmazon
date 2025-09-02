
class Cart{
   cart = undefined;
   localStorageKey = undefined;
   constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
   }

   loadFromStorage(){
    this.cart = JSON.parse(localStorage.getItem(this.localStorageKey));

    if(!this.cart.items){
        this.cart=[{
                    id : '54e0eccd-8f36-462b-b68a-8182611d9add',
                    quantity : 100,
                    deliveryOption : '1'
                },{
                    id : '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
                    quantity : 23,
                    deliveryOption : '3'
                }]
    }
   }
   saveToStorage(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cart))
   }
    addToCart(productId) {
       let itemFound = false;
       let quantitySelected = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

       this.cart.forEach((item) => {
           if (item.id === productId) {
               item.quantity += quantitySelected;
               itemFound = true;
           }
       })
       if (!itemFound) {
           this.cart.push({
               id: productId,
               quantity: quantitySelected,
               deliveryOption: '3'

           })
       }
       this.saveToStorage();
   }
   getCartQuantity() {
       cartQuantity = this.cart.reduce((total, item) => total + item.quantity, 0);
       console.log("Updated Cart Quantity: ", cartQuantity);
       return cartQuantity;
   }
   removeItemFromCart(productId) {
       this.cart = this.cart.filter(item => item.id !== productId);
       this.saveToStorage();
   }
   updateQuantityItem (productId, newQuantity) {
       this.cart.forEach((item) => {
           if (item.id == productId) {
               item.quantity = newQuantity;
           }
       });
       this.saveToStorage();
   }
   updateDeliveryOption = function (productId, deliveryOption) {

       for (let i = 0; i < cart.length; i++) {
           if (this.cart[i].id == productId) {
               this.cart[i].deliveryOption = deliveryOption;
               break;
           }
       }
       this.saveToStorage();
   }

}
