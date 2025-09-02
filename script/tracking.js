import {
    orders
} from "../data/orders.js";
import {
    loadProducts,
    getProductInfo
} from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

let renderTrackingPage = function (productOrder, productInfo) {
    if (!productOrder || !productInfo) {
        document.querySelector('.js-order-tracking').innerHTML = `<div>Order or Product not found.</div>`;
        return;
    }

    const arrivingDateString = dayjs(productOrder.estimatedDeliveryTime).format('MMMM D');

    const html = `
    <div class="delivery-date">Arriving on ${arrivingDateString}</div>
    <div class="product-info">${productInfo.name}</div>
    <div class="product-info">Quantity: ${productOrder.quantity}</div>
    <img class="product-image" src="${productInfo.image}">
    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label current-status">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

    document.querySelector('.js-order-tracking').innerHTML = html;
};

loadProducts().then(() => {
    const productOrder = orders.searchOrder(orderId, productId); // Make sure this returns expected format
    const productInfo = getProductInfo(productId);

    renderTrackingPage(productOrder, productInfo);
});
