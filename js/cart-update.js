document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const navbarQuantity = document.getElementById('navbar-quantity');

    if (navbarQuantity) {
        navbarQuantity.textContent = cart.length;
    }
}
