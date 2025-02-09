const all_product_url = "https://v2.api.noroff.dev/rainy-days";

async function allProducts() {
    try {
        const response = await fetch(all_product_url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function menProducts(productsData){
    const menProducts = [];

    for(let i = 0; i < productsData.length; i++){
        if(productsData[i].gender === "Male"){
            menProducts.push(productsData[i]); 
        }else{
            console.log('NOt men §§§' + productsData[i].gender);
        }
    }

    console.log(menProducts);
}

async function getMenProducts() {
    const products = await allProducts();
    if (products) {
        menProducts(products.data);  
    }
}

document.addEventListener('DOMContentLoaded',async () => {
    const productContainer = document.getElementById('product-container');

    const products = await allProducts();
    products.data.forEach((product) => {
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');

        // Create and append product image
        const productImage = document.createElement('img');
        productImage.src = product.image.url;
        productImage.alt = product.image.alt;
        productBox.appendChild(productImage);

        // Create and append product title
        const productTitle = document.createElement('h3');
        productTitle.textContent = product.title.replaceAll('Rainy Days ', '');
        productBox.appendChild(productTitle);

        // // Create and append product description
        // const productDescription = document.createElement('p');
        // productDescription.textContent = product.description;
        // productBox.appendChild(productDescription);

        // Append the product box to the container
        productContainer.appendChild(productBox);
    });
})