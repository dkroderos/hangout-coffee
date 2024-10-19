// Wait for the DOM to load before executing code
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
            const price = parent.querySelector('p').innerText;

            let itemName = name;
            const itemPrice = parseFloat(price.replace('₱', ''));

            let flavor = '';
            // Check if the item is "Flavored Fries" to prompt for flavor
            if (itemName === 'Flavored Fries') {
                while (true) {
                    flavor = prompt("Choose a flavor: BBQ, Cheese, Sour Cream");

                    if (['BBQ', 'Cheese', 'Sour Cream'].includes(flavor)) {
                        itemName
                        break; // Exit loop once valid flavor is selected
                    } else {
                        alert("Please choose a valid flavor: BBQ, Cheese, or Sour Cream.");
                    }
                }
            }

            const item = {
                name: itemName,
                type: flavor,  // Add flavor as a type for unique identification
                price: itemPrice
            };

            addToCart(item);  // Call the addToCart function
        });
    });
}

// Add to cart function
function addToCart(item) {
    let quantity;
    while (true) {
        quantity = prompt(`How many of ${item.name} would you like to add?`, "1");

        if (quantity === null) { // User canceled the prompt
            return;
        }

        quantity = parseInt(quantity);
        if (!isNaN(quantity) && quantity > 0) {
            break; // Exit loop when a valid quantity is provided
        } else {
            alert("Please enter a valid quantity.");
        }
    }

    let cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.name === item.name && cartItem.type === item.type);
    const cost = item.price * quantity;

    if (existingItem) {
        existingItem.quantity += quantity; // Update the quantity
    } else {
        cart.push({ ...item, quantity }); // Add new item to the cart
    }

    saveCart(cart);
    alert(`${quantity} of ${item.name} added to cart!\nCost: ₱ ${cost.toFixed(2)}`);
}

// Get current cart from localStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : []; // Return parsed cart or empty array
}

// Save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(cart); // Update the cart count after saving
}

// Update the cart count on the page
function updateCartCount(cart) {
    const cartCountElement = document.getElementById("cart-count");
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.innerText = totalQuantity; 
}
