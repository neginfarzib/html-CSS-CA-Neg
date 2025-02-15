const product_url = "https://v2.api.noroff.dev/rainy-days/";

async function getProducts(productId) {
    try {
        const response = await fetch(product_url+ productId);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}



document.addEventListener('DOMContentLoaded',async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product-id");

    const product = await getProducts(productId);

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
        productSize.classList.add('sizes');
        productSizes.appendChild(productSize);
    }

})

