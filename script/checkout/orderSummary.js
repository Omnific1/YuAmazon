import { getProductInfo,  } from "../../data/products.js";
import { convertCentToRupees } from "../utils/centsConversions.js"; 
import {cart} from "../../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  calculateDeliveryDate
} from '../../data/delivery.js';
import { renderPaymentDetails } from "./paymentSummary.js";

function renderQuantityCheckout(){
  document.querySelector('.js-checkout-orders-quantity').textContent = `${cart.getCartQuantity()} items`;
}

renderQuantityCheckout();

export let loadCartsHTML = function() {
    let htmlCode = '';
    let orderSummary = document.querySelector('.order-summary');
    orderSummary.innerHTML = '';
    
    cart.cart.forEach((item) => {
        let product = getProductInfo(item.productId);
        if(!product){
          return;
        }
        let shippingdays ;
        deliveryOptions.forEach((option)=>{
          if(option.id == item.deliveryOptionId){
            shippingdays = option.days
          }
        });
        let deliveryDate = dayjs().add(shippingdays,'days');
        deliveryDate = deliveryDate.format('dddd, MMM D YYYY');
        htmlCode += `<div class="cart-item-container-${product.id} js-checkout-container">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  Rs. ${convertCentToRupees(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-checkout" data-product-id = "${product.id}">
                    Update
                  </span>
                  <input class="quantity-input js-input-checkout-${product.id} ">
                  <span class="save-quantity-link  link-primary js-update-save" data-product-id = "${product.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-cart " data-product-id = "${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                 ${deliveryOptionHTML(product.id,item)}
                </div>
              </div>

              
            </div>
          </div>`
          
    });
    orderSummary.innerHTML = htmlCode;
    eventListenerBinding();
}

// loadCartsHTML();
function deliveryOptionHTML(productId,item){
    let html = '';

    deliveryOptions.forEach((option)=>{
      let dateString = calculateDeliveryDate(option.days);

      let priceString = convertCentToRupees(option.priceCents);
      priceString = priceString == 0  ? "FREE - Shipping" : `Rs. ${priceString} - Shipping` ;

      const isChecked = option.id === item.deliveryOptionId;
      html += `<div class="delivery-option">
                  <input type="radio" class="delivery-option-input js-delivery-option-input  testid1" name="delivery-option-${item.productId}"
                  ${isChecked?'checked':''} data-product-id = "${item.productId}" data-delivery-option-id = "${option.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}
                    </div>
                  </div>
                </div>  
      `;
    })

    

    return html;
  
}

function eventListenerBinding(){
//To remove item from cart 
document.querySelectorAll('.js-delete-cart').forEach((deleteButton)=>{
      

  deleteButton.addEventListener('click',()=>{
  let {productId}= deleteButton.dataset;
  
  cart.removeItemFromCart(productId);

  document.querySelector('.js-checkout-orders-quantity').textContent = cart.getCartQuantity;
  loadCartsHTML();
  renderQuantityCheckout();
  renderPaymentDetails();
  })
  
})

//To displays the input and save button
document.querySelectorAll('.js-update-quantity-checkout').forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const {productId} = updateButton.dataset;
      const container = document.querySelector(
        `.cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
      updateButton.classList.add('is-editing-quantity');
    });
  });

//when clicked save button we can actually update it
document.querySelectorAll('.js-update-save').forEach((saveButton)=>{
  saveButton.addEventListener('click',()=>{
    const {productId} = saveButton.dataset;
    const container = document.querySelector(
      `.cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');

    const input = document.querySelector(`.js-input-checkout-${productId}`);
    const newQuantity = Number(input.value);
    if(newQuantity > 0){
      cart.updateQuantityItem(productId,newQuantity);
    }else{
      alert("ENTER VALID QUANITY");
      return;
    }
    loadCartsHTML();
    renderQuantityCheckout();
    renderPaymentDetails();
  })
})

//To change the delivery option using radio
document.querySelectorAll('.js-delivery-option-input').forEach((radioInput)=>{
  radioInput.addEventListener('click',(event)=>{

    let {productId,deliveryOptionId  } = radioInput.dataset ;
    cart.updateDeliveryOption(productId,deliveryOptionId);
    loadCartsHTML();
  })
    
})
renderPaymentDetails();
}
