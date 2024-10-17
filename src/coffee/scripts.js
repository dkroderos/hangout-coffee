document.addEventListener('DOMContentLoaded', function () {
    setupAddToCartButtons();
    updateCartCount(getCart());
});

// Handle the "Add to Cart" button click
function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const parent = this.parentElement;
            const name = parent.querySelector('h3').innerText;
            const priceText = parent.querySelector('p').innerText;
            const price = parseFloat(priceText.replace('₱', '').trim());

            const item = {
                name: name,
                price: price
            };

            addToCart(item);
        });
    });
}

// Add to cart function
function addToCart(item) {
    let quantity = prompt("How many of " + item.name + " would you like to add?", "1");
    
    if (quantity === null) { // Cancelled
        return; 
    }

    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return; 
    }
    
    let cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    const cost = item.price * quantity;
    
    if (existingItem) {
        existingItem.quantity += quantity; // Update quantity
        existingItem.price += cost; // Update total price
    } else {
        item.price = cost; // Set price for the new item
        cart.push({ ...item, quantity }); 
    }

    saveCart(cart);
    alert(quantity + " of " + item.name + " added to cart! \nCost: ₱ " + cost);
}

// Get current cart from localStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart) {
        return JSON.parse(cart);
    } else {
        return []; 
    }
}

// Save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(cart);
}

// Update the cart count in the HTML
function updateCartCount(cart) {
    const cartCountElement = document.querySelector('.cart-icon span') || document.createElement('span');
    
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity; 
    });
    
    cartCountElement.innerText = totalQuantity; 
    if (!document.querySelector('.cart-icon span')) {
        document.querySelector('.cart-icon').appendChild(cartCountElement);
    }
}
