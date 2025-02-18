

document.addEventListener('DOMContentLoaded',async () => {
    let cartList = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCheckoutContainer = document.getElementById("checkout-card-container");

    console.log(cartList);
    if (cartList.length === 0) {
        const emptyCartListH = document.createElement('h2');
        emptyCartListH.textContent = "Your cart is empty!";
        cartCheckoutContainer.appendChild(emptyCartListH)

    } else {
        cartList.forEach((product, index) => {
            const productBox = document.createElement('div');
            productBox.classList.add('checkout-product-box');

            const productHref = document.createElement('a');
            productHref.href = 'product.html?product-id=' + product.id;
            productBox.appendChild(productHref);

            const productImage = document.createElement('img');
            productImage.src = product.image.url;
            productImage.alt = product.image.alt;
            productHref.appendChild(productImage);

            const productTitle = document.createElement('h4');
            productTitle.textContent = product.title.replaceAll('Rainy Days ', '');
            productBox.appendChild(productTitle);

            const productSelectedSize = document.createElement('p');
            productSelectedSize.textContent = "Size: " + product.selectedSize;
            productBox.appendChild(productSelectedSize);

            const productPrice = document.createElement('p');
            productPrice.textContent = 'Price: kr ' + product.price;

            productBox.appendChild(productPrice);

            const productRemoveButton = document.createElement('button');
            productRemoveButton.textContent = "Remove from cart";
            productRemoveButton.addEventListener('click', () => {
                let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
                updatedCart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                location.reload();
            });
            productBox.appendChild(productRemoveButton);


            cartCheckoutContainer.appendChild(productBox);
        });
    }
})

