import { loadProducts,products} from "../data/products.js";
import { cart } from "../data/cart.js";


let renderProducts = function () {
    products.forEach((product) => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');

        const productImageContainer = document.createElement('div');
        productImageContainer.classList.add('product-image-container');

        const imageTag = document.createElement('img');
        imageTag.classList.add('product-image');
        imageTag.setAttribute('src', product.image);

        productImageContainer.appendChild(imageTag);

        productContainer.appendChild(productImageContainer);

        const productName = document.createElement('div');
        productName.classList.add('product-name', 'limit-text-to-2-lines');
        productName.textContent = product.name;

        productContainer.appendChild(productName);

        const productRatingContainer = document.createElement('div');
        productRatingContainer.classList.add('product-rating-container');

        const ratingImageTag = document.createElement('img');
        ratingImageTag.classList.add('product-rating-stars');
        ratingImageTag.setAttribute('src', product.getStarsUrl());

        const ratingCount = document.createElement('div');
        ratingCount.classList.add('product-rating-count', 'link-primary');
        ratingCount.textContent = product.rating.count;

        productRatingContainer.appendChild(ratingImageTag);
        productRatingContainer.appendChild(ratingCount);

        productContainer.appendChild(productRatingContainer);

        const productPriceElement = document.createElement('div');
        productPriceElement.classList.add('product-price');
        productPriceElement.textContent = 'Rs. ' + product.getPriceRuppes();;

        productContainer.appendChild(productPriceElement);

        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('product-quantity-container');

        const selectTag = document.createElement('select');
        selectTag.classList.add(`js-quantity-selector-${product.id}`)
        for (let i = 1; i <= 10; i++) {
            let optionTag = document.createElement('option');
            optionTag.setAttribute('value', `${i}`);
            optionTag.textContent = i;
            selectTag.appendChild(optionTag);
        }

        quantityContainer.appendChild(selectTag);
        productContainer.appendChild(quantityContainer);

        document.querySelector('.products-grid').appendChild(productContainer).setAttribute('selected', 'true');

        const productSpacer = document.createElement('div');
        productSpacer.classList.add('product-spacer');

        productContainer.appendChild(productSpacer);

        const addedCartElement = document.createElement('div');
        addedCartElement.classList.add('added-to-cart');

        const checkmarkImageTag = document.createElement('img');
        checkmarkImageTag.setAttribute('src', 'images/icons/checkmark.png');

        addedCartElement.appendChild(checkmarkImageTag);
        addedCartElement.textContent = 'Added';

        productContainer.appendChild(addedCartElement);

        const button = document.createElement('button');
        button.classList.add('add-to-cart-button', 'button-primary');
        button.setAttribute('data-product-id', product.id);
        button.textContent = 'Add to Cart';
        productContainer.appendChild(button);

        const firstOption = document.querySelector('.product-quantity-container select option');
    })

    document.querySelectorAll('.add-to-cart-button').forEach((button) => {
        button.addEventListener('click', () => {
            const {
                productId
            } = button.dataset;
            let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

            cart.addToCart(productId,quantity);
            //refelct in html
            renderQuantity();

        })
    })
}

let renderQuantity = function () {
    document.querySelector('.cart-quantity').textContent = cart.getCartQuantity();
}

loadProducts().
then(renderProducts)
.catch(err=>{
    alert('Check your Internet connection')
});
renderQuantity();


