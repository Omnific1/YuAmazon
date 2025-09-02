import {
    loadProducts
} from "../data/products.js";
import { loadCartsHTML } from "./checkout/orderSummary.js";
import { renderPaymentDetails } from "./checkout/paymentSummary.js"


console.log('checkoutTest1');

loadProducts().then(() => {
loadCartsHTML();
renderPaymentDetails();
}   
)
