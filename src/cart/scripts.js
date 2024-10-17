//angelo was here
document.addEventListener('DOMContentLoaded', function (event) {
    setupAddToCartButtons();
    const cart = getCart();
    updateCartCount(cart);
    populateCartPage(cart); // Populate the cart on page load
    updateSubtotal(); // Update subtotal on page load
});

// Handle the order form submission
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        contact: document.getElementById('contact').value,
        email: document.getElementById('email').value,
        note: document.getElementById('note').value,
        branch: "QC Branch" // Fixed to only use QC branch
    };

    // Generate a random 5-digit order number
    const orderNumber = Math.floor(10000 + Math.random() * 90000); // Random 5-digit number

    // Concatenate first name, last name, and order number
    const customerWithOrderNumber = `${formData.firstName} ${formData.lastName}-${orderNumber}`;

    // Get current date, time, and day of the week
    const now = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[now.getDay()]; // Get the current day of the week
    const formattedDate = now.toLocaleDateString(); // e.g., "10/1/2024"
    const formattedTime = now.toLocaleTimeString(); // e.g., "2:45:12 PM"

    // Prepare the email details with cart items
    const cart = getCart();
    const cartItemsDetails = cart.map(item => `${item.name}: ${item.quantity} x ₱${(item.price / item.quantity).toFixed(2)}`).join('\n');
    const totalCartPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    const templateParams = {
        from_name: customerWithOrderNumber,
        to_name: "QC Branch", // Fixed recipient
        message: `Customer Details: \nCustomer: ${formData.firstName} ${formData.lastName}\nAddress: ${formData.address}, ${formData.city}\nContact: ${formData.contact}\nEmail: ${formData.email}\nNote: ${formData.note}\nOrder Date: ${currentDay}, ${formattedDate}\nOrder Time: ${formattedTime}\n\nCart Items:\n${cartItemsDetails}\n\nTotal Price: ₱${totalCartPrice}`,
        order_number: customerWithOrderNumber,
        date: formattedDate,
        time: formattedTime,
        day: currentDay
    };

    // Send the email using the QC template
    emailjs.send('service_xawoitj', 'template_qc', templateParams)
    .then(function(response) {
        alert('Order submitted successfully! Your order number is ' + customerWithOrderNumber);
    }, function(error) {
        console.error('Failed to send order:', error); // Log the complete error
        alert('Failed to send order: ' + JSON.stringify(error)); // Show error details in alert
    });

    window.location.href ="/cart/ty.html";
});

// Setup "Add to Cart" buttons
function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const grandParent = this.parentElement.parentElement;
            const parent = this.parentElement;
            const name = grandParent.querySelector('h3').innerText;
            const ounce = parent.querySelector('span:nth-child(1)').innerText;
            const price = parent.querySelector('span:nth-child(2)').innerText;

            const itemName = name + ` (${ounce})`;
            const itemPrice = parseFloat(price.replace('₱', ''));

            const item = {
                name: itemName,
                price: itemPrice
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
        existingItem.quantity += quantity;
        existingItem.price += cost; // This should update the total cost for the existing item
    } else {
        item.price = cost;
        cart.push({ ...item, quantity }); 
    }

    saveCart(cart);
    alert(quantity + " of " + item.name + " added to cart! \nCost: ₱ " + cost);
}


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
    updateCartCount(cart); // Use the updated cart to refresh the count
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

function deleteItem(index) {

    location.reload(); 
    // Get the current cart from localStorage
    let cart = getCart();

    // Remove the item at the specified index
    cart.splice(index, 1);

    // Save the updated cart back to localStorage
    saveCart(cart);


    // Repopulate the cart section to reflect the changes
    populateCartPage(cart);  // Repopulates the UI

    // Update the subtotal and total after deletion
    updateSubtotal();  // Refresh subtotal and total prices
    
    // Update the cart count displayed in the header
    updateCartCount(cart);  // Update cart item count in header

    // Optionally, show a success message or transition
    alert("Item successfully deleted and cart updated.");
}

// Populate the cart on the cart page
function populateCartPage(cart) {
    const orderList = document.querySelector('.order-list');

    // Remove existing hardcoded items if any
    orderList.querySelectorAll('.order-item').forEach(item => item.remove());

    // Check if the cart is empty
    if (cart.length === 0) {
        orderList.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    // Loop through each item in the cart and create HTML elements for them
    cart.forEach((item, index) => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');

        const itemImage = `<img onclick="deleteItem(${index})" src="/cart/pics/${item.name.toLowerCase().replace(/\s+/g, '_')}.png" alt="${item.name}" style="margin-right:-10%; background-color: #FDF8ED;">`;
        const itemDetails = `<span class="o-details"><p>${item.name}</p></span>`;
        const redCircle = `<span id="span1" style="position: absolute; cursor: pointer;" class="red-circle">&times;</span>`;
        const itemPrice = `<span class="o-price"><p id="price-${index}">₱ ${item.price.toFixed(2)}</p></span>`;
        const itemQuantity = `
            <span class="o-quantity">
                <button onclick="decrement('input-${index}', 'price-${index}', 'total-${index}')">-</button>
                <input id="input-${index}" type="number" value="${item.quantity}" min="1" style="width: 50px;" onchange="updateItemTotal('input-${index}', 'price-${index}', 'total-${index}')">
                <button onclick="increment('input-${index}', 'price-${index}', 'total-${index}')">+</button>
            </span>
        `;
        const itemTotal = `<span id="total-${index}" class="o-total">₱ ${(item.price).toFixed(2)}</span>`;

        orderItem.innerHTML = `
            ${itemImage}
            ${redCircle}
            ${itemDetails}
            ${itemPrice}
            ${itemQuantity}
            ${itemTotal}
        `;

        orderList.appendChild(orderItem);
    });
}

// Functions to increment and decrement quantities
function updateItemTotal(inputId, priceId, totalId) {
    let quantity = document.getElementById(inputId).value;
    let price = extractPrice(document.getElementById(priceId).textContent);
    let total = quantity * price;
    document.getElementById(totalId).textContent = `₱ ${total.toFixed(2)}`;

    // Call function to update the subtotal and total
    updateSubtotal();
}

// Function to handle increment
function increment(inputId, priceId, totalId) {
    let input = document.getElementById(inputId);
    input.value = parseInt(input.value) + 1;
    updateItemTotal(inputId, priceId, totalId);
}

// Function to handle decrement
function decrement(inputId, priceId, totalId) {
    let input = document.getElementById(inputId);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        updateItemTotal(inputId, priceId, totalId);
    }
}

// Function to update the subtotal for all items
function updateSubtotal() {
    let subtotal = 0;

    const totals = document.querySelectorAll('.o-total');
    totals.forEach(total => {
        subtotal += extractPrice(total.textContent);
    });

    document.getElementById("confirm-subtotal").textContent = `₱ ${subtotal.toFixed(2)}`;
    document.getElementById("confirm-total").textContent = `₱ ${subtotal.toFixed(2)}`;


}

// Function to extract the price value from a price text (removing the "₱" sign)
function extractPrice(priceText) {
    return parseFloat(priceText.replace("₱", "").trim());
}

// Event listener to populate the cart when the cart page loads
document.addEventListener('DOMContentLoaded', function() {
    const cart = getCart();
    populateCartPage(cart); // Populate the cart on page load
    updateSubtotal(); // Update subtotal on page load
});


