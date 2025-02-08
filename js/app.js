async function allProducts(url) {
    try {
        const response = await fetch(url);
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
    const products = await allProducts("https://v2.api.noroff.dev/rainy-days");  
    if (products) {
        menProducts(products.data);  
    }
}

getMenProducts();