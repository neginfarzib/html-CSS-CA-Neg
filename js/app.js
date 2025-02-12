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
    const genderFilter = document.getElementById('gender-filter');

    const products = await allProducts();
    displayProducts(products.data);

    function displayProducts(products){
        console.log("products in displayProducts:", products);
        productContainer.innerHTML = '';
        products.forEach((product) => {
            const productBox = document.createElement('div');
            productBox.classList.add('product-box');

            const productImage = document.createElement('img');
            productImage.src = product.image.url;
            productImage.alt = product.image.alt;
            productBox.appendChild(productImage);

            const productPriceTileDiv = document.createElement('div');
            productBox.appendChild(productPriceTileDiv)

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

