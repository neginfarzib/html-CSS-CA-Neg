

document.addEventListener('DOMContentLoaded',async () => {
    let cartList = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemContainer = document.getElementById('cart-item-container');

    const cartItemCounter = document.getElementById('cart-item-counter');
    cartItemCounter.textContent = 'MY CART ('+cartList.length+' ITEM)'

    const cartItemPriceTotal = document.getElementById('cart-item-price-total');
    let cartItemPriceTotalNumber = 0;

    if (cartList.length === 0) {
        const emptyCartListH = document.createElement('h2');
        emptyCartListH.textContent = "Your cart is empty!";
        cartItemContainer.appendChild(emptyCartListH)

    } else {
        cartList.forEach((product, index) => {
            const cartItemBox = document.createElement('div');
            cartItemBox.classList.add('cart-item-box');

            const cartItemTitleDiv = document.createElement('div');
            const cartItemTitleP = document.createElement('p');
            const cartItemTitlePStrong = document.createElement('strong');
            cartItemTitlePStrong.textContent = product.title.replaceAll('Rainy Days ', '');
            cartItemTitleP.appendChild(cartItemTitlePStrong);
            cartItemTitleDiv.appendChild(cartItemTitleP);

            const cartItemDetailsDiv = document.createElement('div');
            cartItemDetailsDiv.classList.add('cart-item-details');

            const cartItemDetailsColorSize = document.createElement('div');

            const cartItemColorDiv = document.createElement('div');
            const cartItemColorP = document.createElement('p');
            cartItemColorP.textContent = 'Color : ' + product.baseColor;
            cartItemColorDiv.appendChild(cartItemColorP);

            cartItemDetailsColorSize.appendChild(cartItemColorDiv);

            const cartItemSizeDiv = document.createElement('div');
            const cartItemSizeP = document.createElement('p');
            cartItemSizeP.textContent = 'Size : ' + product.selectedSize;
            cartItemSizeDiv.appendChild(cartItemSizeP);

            cartItemDetailsColorSize.appendChild(cartItemSizeDiv);

            const cartItemImgDiv = document.createElement('div');
            const cartItemImg = document.createElement('img')
            cartItemImg.classList.add('cart-item-img');
            cartItemImg.src = product.image.url;
            cartItemImg.alt = product.image.alt;
            cartItemImgDiv.appendChild(cartItemImg);

            cartItemDetailsDiv.appendChild(cartItemDetailsColorSize);
            cartItemDetailsDiv.appendChild(cartItemImgDiv);

            const cartItemPriceNokDiv = document.createElement('div');
            cartItemPriceNokDiv.classList.add('cart-item-price-shipping');
            const cartItemPriceDiv = document.createElement('div');
            const cartItemPriceP = document.createElement('p');
            cartItemPriceP.textContent = 'Price';
            cartItemPriceDiv.appendChild(cartItemPriceP);

            const cartItemNokDiv = document.createElement('div');
            const cartItemNokP = document.createElement('p');
            cartItemNokP.textContent = 'NOK ' + product.price;
            cartItemPriceTotalNumber += product.price;
            cartItemNokDiv.appendChild(cartItemNokP);

            cartItemPriceNokDiv.appendChild(cartItemPriceDiv);
            cartItemPriceNokDiv.appendChild(cartItemNokDiv);


            const cartItemRemoveButtonDiv = document.createElement('div');
            cartItemRemoveButtonDiv.classList.add('cart-item-remove-button-div')
            const cartItemRemoveButton = document.createElement('button');
            cartItemRemoveButton.classList.add('cart-item-remove-button')
            cartItemRemoveButton.textContent = "Remove from cart";
            cartItemRemoveButton.addEventListener('click', () => {
                let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
                updatedCart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                location.reload();
            });
            cartItemRemoveButtonDiv.appendChild(cartItemRemoveButton);

            cartItemBox.appendChild(cartItemTitleDiv);
            cartItemBox.appendChild(cartItemDetailsDiv);
            cartItemBox.appendChild(cartItemPriceNokDiv);
            cartItemBox.appendChild(cartItemRemoveButtonDiv);


            cartItemContainer.appendChild(cartItemBox);
            cartItemContainer.appendChild(document.createElement('hr'));
        });
    }
    cartItemPriceTotal.textContent = 'Total : ' + cartItemPriceTotalNumber;
})

