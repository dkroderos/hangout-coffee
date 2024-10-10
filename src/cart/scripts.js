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
        branch: document.getElementById('branch').value
    };

    // Generate a random 5-digit order number
    const orderNumber = Math.floor(10000 + Math.random() * 90000); // Random 5-digit number

    // Concatenate first name, last name, and order number in the format: Customer FirstName LastName-(orderNumber)
    const customerWithOrderNumber = `${formData.firstName} ${formData.lastName}-${orderNumber}`;

    // Get current date, time, and day of the week
    const now = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[now.getDay()]; // Get the current day of the week
    const formattedDate = now.toLocaleDateString(); // e.g., "10/1/2024"
    const formattedTime = now.toLocaleTimeString(); // e.g., "2:45:12 PM"

    // Mapping branches to specific EmailJS template IDs
    const branchTemplateMap = {
        "Muntinlupa Branch": "template_muntinlupa",
        "Pacita Branch": "template_qc",
        "Lucena Quezon Branch": "template_qc",
        "Dasmarinas Cavite Branch": "template_qc",
        "Alabang Branch": "template_qc",
        "Quezon City Branch": "template_qc"
    };

    // Get the selected template ID based on the branch
    const selectedTemplateId = branchTemplateMap[formData.branch];

    // Prepare the email details, including the formatted customer name with order number, date, time, and day
    const templateParams = {
        from_name: customerWithOrderNumber, // Use the formatted customer name with order number
        to_name: formData.branch,
        message: `Customer Details: \n Customer: ${formData.firstName} ${formData.lastName} \nAddress: ${formData.address}, ${formData.city}\nContact: ${formData.contact}\nEmail: ${formData.email}\nNote: ${formData.note}\nOrder Date: ${currentDay}, ${formattedDate}\nOrder Time: ${formattedTime}`,
        order_number: customerWithOrderNumber,
        date: formattedDate,
        time: formattedTime,
        day: currentDay
    };

    // Send the email using the correct template
    if(formData.branch == 'Quezon City Branch'){
        emailjs.send('service_xawoitj', selectedTemplateId, templateParams)
            .then(function(response) {
                alert('Order submitted successfully! Your order number is ' + customerWithOrderNumber);
            }, function(error) {
                alert('Failed to send order, please try again later.');
            });
    }
    else if(formData.branch == 'Muntinlupa Branch'){
        emailjs.send('service_xawoitj', selectedTemplateId, templateParams)
            .then(function(response) {
                alert('Order submitted successfully! Your order number is ' + customerWithOrderNumber);
            }, function(error) {
                alert('Failed to send order, please try again later.');
            });
    }
    else if(formData.branch == 'Pacita Branch'){
        emailjs.send('service_xawoitj', selectedTemplateId, templateParams)
            .then(function(response) {
                alert('Order submitted successfully! Your order number is ' + customerWithOrderNumber);
            }, function(error) {
                alert('Failed to send order, please try again later.');
            });
    }
    else if(formData.branch == 'Lucena Quezon Branch'){
        emailjs.send('service_xawoitj', selectedTemplateId, templateParams)
            .then(function(response) {
                alert('Order submitted successfully! Your order number is ' + customerWithOrderNumber);
            }, function(error) {
                alert('Failed to send order, please try again later.');
            });
    }
    else if(formData.branch == 'Dasmarinas Cavite Branch'){
        emailjs.send('service_xawoitj', selectedTemplateId, templateParams)
            .then(function(response) {
                alert('Order submitted successfully! Your order number is ' + customerWithOrderNumber);
            }, function(error) {
                alert('Failed to send order, please try again later.');
            });
    }
    else if(formData.branch == 'Alabang Branch'){
        emailjs.send('service_xawoitj', selectedTemplateId, templateParams)
            .then(function(response) {
                alert('Order submitted successfully! Your order number is ' + customerWithOrderNumber);
            }, function(error) {
                alert('Failed to send order, please try again later.');
            });
    }
    else{
        alert('No Branch Selected');
    }
});

// Function to extract the price value from a price text (removing the "₱" sign)
function extractPrice(priceText) {
    return parseFloat(priceText.replace("₱", "").trim());
}

// Function to update the total price for each order item
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

    for (let i = 1; i <= 8; i++) {  // Assuming there are 8 items
        let itemTotal = extractPrice(document.getElementById(`o${i}`).textContent);
        subtotal += itemTotal;
    }

    document.getElementById("subtotal").textContent = `₱ ${subtotal.toFixed(2)}`;
    document.getElementById("confirm-subtotal").textContent = `₱ ${subtotal.toFixed(2)}`;
    document.getElementById("confirm-total").textContent = `₱ ${subtotal.toFixed(2)}`;
}

