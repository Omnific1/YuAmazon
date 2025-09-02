import {
    orders
} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {
    convertCentToRupees
} from './utils/centsConversions.js';
import {
    loadProducts,
    getProductInfo
} from '../data/products.js';
import { cart } from '../data/cart.js';
let ord = orders.orders;
console.log(ord);

const renderOrdersHTML = function () {
    const orderContainer = document.querySelector('.js-order-containers');
    let ordersHTML = '';

    document.querySelector('.js-cart-quantity').textContent = cart.getCartQuantity();

    orders.orders.forEach((order) => {
        const placedDateString = dayjs(order.orderTime).format('MMMM D');
        const orderHeader = `
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${placedDateString}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${convertCentToRupees(order.totalCostCents)}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      `;

        let orderDetails = '';
        order.products.forEach((product) => {
            const productInfo = getProductInfo(product.productId);
            const estimatedDeliveryString = dayjs(productInfo.estimatedDeliveryTime).format('MMMM D');

            orderDetails += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${productInfo.image}">
          </div>

          <div class="product-details">
            <div class="product-name">${productInfo.name}</div>
            <div class="product-delivery-date">Arriving on: ${estimatedDeliveryString}</div>
            <div class="product-quantity">Quantity: ${product.quantity}</div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
              <button class="track-package-button button-secondary">Track package</button>
            </a>
          </div>
        </div>`;
        });

        ordersHTML += `<div class="order-container">
            ${orderHeader}
            ${orderDetails}
        </div>`;
    });

    orderContainer.innerHTML = ordersHTML;
};






loadProducts().then(renderOrdersHTML);

console.log(dayjs(ord[0].orderTime).format('MMMM D'));