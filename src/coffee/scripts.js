document.addEventListener('DOMContentLoaded', function () {
    setupAddToCartButtons();
    updateCartCount(getCart()); 
});

function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const grandgrandParent = this.parentElement.parentElement.parentElement;
            const parent = this.parentElement;
            
            // Change from selecting 'h3' directly to using 'querySelector' for the product name
            const name = grandgrandParent.querySelector('h3').innerText;
            
            // Select the first and second 'p' elements for size and price
            const ounce = parent.querySelector('p:nth-child(1)').innerText;
            const price = parent.querySelector('p:nth-child(2)').innerText;

            // Separate the item name from the ounce
            const itemName = name; // Only the name without ounces
            const itemType = ounce; // Keep the ounce for separate storage
            const itemPrice = parseFloat(price.replace('₱', ''));

            const item = {
                name: itemName,
                type: itemType, // Store the ounce separately
                price: itemPrice
            };

            addToCart(item);
        });
    });
}


function addToCart(item) {
    let quantity = prompt("How many of " + item.name + " (" + item.type + ") would you like to add?", "1");
    
    if (quantity === null) { // If the user cancels the prompt
        return; 
    }

    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return; 
    }
    
    let cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.name === item.name && cartItem.type === item.type);
    const totalCost = item.price * quantity; // Calculate total cost

    if (existingItem) {
        existingItem.quantity += quantity; // Increase quantity for existing item
    } else {
        cart.push({ 
            ...item, 
            quantity: quantity, 
        }); 
    }

    saveCart(cart);
    alert(quantity + " of " + item.name + " (" + item.type + ") added to cart! \nCost: ₱ " + totalCost);
}



// Get the current cart from localStorage
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
    updateCartCount(getCart());
}

// Update the cart count in the HTML
function updateCartCount(cart) {
    const cartCountElement = document.getElementById("cart-count");
    
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity; 
    });
    
    cartCountElement.innerText = totalQuantity; 
}