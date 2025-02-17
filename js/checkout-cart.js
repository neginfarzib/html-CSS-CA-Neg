

document.addEventListener('DOMContentLoaded',async () => {
    let cartList = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCheckoutContainer = document.getElementById("checkout-card-container");

    console.log(cartList);
    if (cartList.length === 0) {
        const emptyCartListH = document.createElement('h2');
        emptyCartListH.textContent = "Your cart is empty!";
        cartCheckoutContainer.appendChild(emptyCartListH)

    } else {
        cartList.forEach((product) => {
            const productBox = document.createElement('div');
            productBox.classList.add('checkout-product-box');

            const productHref = document.createElement('a');
            productHref.href = 'product.html?product-id=' + product.id;
            productBox.appendChild(productHref);

            const productImage = document.createElement('img');
            productImage.src = product.image.url;
            productImage.alt = product.image.alt;
            productHref.appendChild(productImage);

            const productPriceTileDiv = document.createElement('div');
            productHref.appendChild(productPriceTileDiv)

            const productTitle = document.createElement('h4');
            productTitle.textContent = product.title.replaceAll('Rainy Days ', '');
            productPriceTileDiv.appendChild(productTitle);

            const productPrice = document.createElement('p');
            productPrice.textContent = 'kr ' + product.price;
            productPriceTileDiv.appendChild(productPrice);

            const productSelectedSize = document.createElement('p');
            productSelectedSize.textContent = product.selectedSize;
            productPriceTileDiv.appendChild(productSelectedSize);

            const productRemoveButton = document.createElement('button');
            productRemoveButton.textContent = "Remove from cart";
            productBox.appendChild(productRemoveButton);


            const productCartSeparator = document.createElement('hr');
            productBox.appendChild(productCartSeparator)

            cartCheckoutContainer.appendChild(productBox);
        });
    }
})

