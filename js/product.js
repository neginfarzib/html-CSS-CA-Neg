const product_url = "https://v2.api.noroff.dev/rainy-days/";

async function getProducts(productId) {
    try {
        const response = await fetch(product_url+ productId);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        const productContainer = document.getElementById('product-container');
        const productErrorDiv = document.createElement('div');
        productErrorDiv.classList.add('product-error');
        const productError = document.createElement('p');
        productError.classList.add('product-error-title');
        productError.textContent = 'Something goes wrong!';
        const productErrorDetails = document.createElement('p');
        productErrorDetails.classList.add('product-error-details');
        productErrorDetails.textContent = 'Please trying later or contact our support';
        productErrorDiv.appendChild(productError);
        productErrorDiv.appendChild(productErrorDetails);

        productContainer.appendChild(productErrorDiv);

        console.error("Error fetching data:", error);
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    localStorage.setItem("cart", JSON.stringify(cart));
    const navbarQuantity = document.getElementById( 'navbar-quantity');
    let navbarQuantityNumber = Number (navbarQuantity.textContent);
    navbarQuantityNumber += 1;
    navbarQuantity.textContent = navbarQuantityNumber;
}


document.addEventListener('DOMContentLoaded',async () => {
    const params = new URLSearchParams(window.location.search);
    const addToCartElement = document.getElementById('add-to-cart');
    const addToCartLoader = document.getElementById('product-loader');
    const productId = params.get("product-id");

    const product = await getProducts(productId);


    addToCartLoader.style.display = 'none';

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCartCount();

    const productImgBig = document.getElementById('product-img-big');
    productImgBig.innerHTML = '';
    productImgBig.src = product.image.url;
    productImgBig.alt = product.image.alt;

    const productTitleH3 = document.getElementById('product-title-h3');
    productTitleH3.innerHTML = '';
    productTitleH3.textContent = product.title;

    const productTitleB = document.getElementById('product-title-b');
    productTitleB.innerHTML = '';
    productTitleB.textContent = product.title;

    const productTitleH5 = document.getElementById('product-title-h5');
    productTitleH5.innerHTML = '';
    productTitleH5.textContent = product.title;

    const productPrice = document.getElementById('product-price');
    productPrice.innerHTML = '';
    productPrice.textContent = product.price;

    const productDescription = document.getElementById('product-description');
    productDescription.innerHTML = '';
    productDescription.textContent = product.description;

    const productColor = document.getElementById('product-color');
    productColor.innerHTML = '';
    productColor.textContent = product.baseColor;

    const productSizes = document.getElementById('product-sizes');
    productSizes.innerHTML = '';
    for (const size of product.sizes) {
        const productSize = document.createElement('div');
        productSize.textContent = size;
        productSize.classList.add('size-button');

        productSize.addEventListener('mouseover', () => {
            productSize.classList.add('hover');
        });

        productSize.addEventListener('mouseout', () => {
            productSize.classList.remove('hover');
        });

        productSize.addEventListener('click', () => {
            document.querySelectorAll('.size-button').forEach(btn => btn.classList.remove('selected'));

            productSize.classList.add('selected');
        });

        productSizes.appendChild(productSize);
    }


    addToCartElement.addEventListener("click", function (){
        const selectedSizeElement = document.querySelector('.size-button.selected');
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'none';

        if (!selectedSizeElement) {
            alert("Please select a size before adding to cart.");
            return;
        }

        const selectedSize = selectedSizeElement.textContent;

        const productWithSize = { ...product, selectedSize };

        addToCart(productWithSize);
    })

    function updateCartCount() {
        const navbarQuantity = document.getElementById( 'navbar-quantity');
        navbarQuantity.textContent = cart.length;
    }

})

