const all_product_url = "https://v2.api.noroff.dev/rainy-days";

async function allProducts() {
    try {
        const response = await fetch(all_product_url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
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

document.addEventListener('DOMContentLoaded',async () => {
    const productContainer = document.getElementById('product-container');
    const genderFilter = document.getElementById('gender-filter');

    const products = await allProducts();
    displayProducts(products.data);

    function displayProducts(products){
        productContainer.innerHTML = '';
        products.forEach((product) => {
            const productBox = document.createElement('div');
            productBox.classList.add('product-box');

            const productHref = document.createElement('a');
            productHref.href = 'product.html?product-id='+ product.id;
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

            // Append the product box to the container
            productContainer.appendChild(productBox);
        });
    }


    genderFilter.addEventListener('change', () => {
        const selectedGender = genderFilter.value;
        if (selectedGender === 'all') {
            displayProducts(products.data);
        } else {
            const filteredProducts = products.data.filter(product => product.gender === selectedGender);
            displayProducts(filteredProducts);
        }
    })
})

