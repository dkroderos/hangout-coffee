document.addEventListener('DOMContentLoaded', function () {
    setupAddToCartButtons();
    updateCartCount(getCart()); 
});

// Handle the "Add to Cart" button click
function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const grandParent = this.parentElement.parentElement;
            const parent = this.parentElement;

            const name = grandParent.querySelector('.details h3').innerText;
            const ounce = parent.querySelector('p:nth-child(1)').innerText;
            const price = parent.querySelector('p:nth-child(2)').innerText;

            const itemName = name;
            const itemType = ounce;
            const itemPrice = parseFloat(price.replace('₱', ''));

            const item = {
                name: itemName,
                type: itemType,
                price: itemPrice
            };

            addToCart(item);
        });
    });
}

//Add to cart function
function addToCart(item) {
    let quantity = prompt("How many of " + item.name + " (" + item.type +  ") would you like to add?", "1");
    
    if (quantity === null) {//canceled
        return; 
    }

    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return; 
    }
    
    let cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.name === item.name && cartItem.type === item.type);
    const cost = item.price * quantity;
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...item, quantity }); 
    }

    saveCart(cart);
    alert(quantity + " of " + item.name + " (" + item.type +  ") added to cart! \nCost: ₱ " + cost.toFixed(2));
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