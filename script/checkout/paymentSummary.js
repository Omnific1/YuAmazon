import {
  cart
} from '../../data/cart.js';
import {
  getProductInfo
} from '../../data/products.js';
import {
  convertCentToRupees
} from '../utils/centsConversions.js'
import {
  getDeliveryByID
} from '../../data/delivery.js';
import {
  percent
} from '../utils/calculation.js'
import {
  orders
} from '../../data/orders.js';
let tax = {
  SGST: 5.5,
  CGST: 4.25,
}

export const renderPaymentDetails = function () {
  let totalProductCost = 0;
  let ShippingCost = 0;

  cart.cart.forEach((item) => {
    let product = getProductInfo(item.productId);
    let deliveryCostItem = getDeliveryByID(item.deliveryOptionId).priceCents;
    totalProductCost += product.priceCents * item.quantity;
    ShippingCost += deliveryCostItem;

  });

  let taxCGST = percent(totalProductCost + ShippingCost, tax.CGST);
  let taxSGST = percent(totalProductCost + ShippingCost, tax.SGST);
  let totalBeforeTax = totalProductCost + ShippingCost;
  let finalAmount = totalBeforeTax + parseFloat(taxCGST) + parseFloat(taxSGST);
  let totalProductCostRupees = convertCentToRupees(totalProductCost);
  let ShippingCostRupees = convertCentToRupees(ShippingCost);
  let taxCGSTRupees = convertCentToRupees(taxCGST);
  let taxSGSTRupees = convertCentToRupees(taxSGST);
  let totalBeforeTaxRupees = convertCentToRupees(totalBeforeTax);
  let finalAmountRupees = convertCentToRupees(finalAmount);

  const paymentSummaryELement = document.querySelector('.payment-summary');


  let paymentSummnaryHTML =
    `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.getCartQuantity()}):</div>
            <div class="payment-summary-money">₹${totalProductCostRupees}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class = "payment-summary-money" >₹${ShippingCostRupees}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totalBeforeTaxRupees}</div>
          </div>

          <div class="payment-summary-row">
            <div> CGST (${tax.CGST}%):</div>
            <div class="payment-summary-money">₹${taxCGSTRupees}</div>
          </div>

          <div class="payment-summary-row">
            <div>SGST (${tax.SGST}%):</div>
            <div class="payment-summary-money">₹${taxSGSTRupees}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${finalAmountRupees}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;
  paymentSummaryELement.innerHTML = paymentSummnaryHTML;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    if(cart.getCartQuantity() == 0){
      alert("ADD some items")
      return
    }
    try{
      let response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cart
        })
      })

      let order = await response.json();

      console.log(order);
      orders.add(order);
      cart.clearCart();
    }catch(err){
      alert(`CHECK YOUR INTERNET  ${err}`)
    }

    window.location.href = 'orders.html';
  })


}