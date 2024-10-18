document.addEventListener("DOMContentLoaded", function () {
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.innerText = getCartCount();
});

function getCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // let cartCoffee = JSON.parse(localStorage.getItem("cartCoffee") || "[]");
  // let cartFood = JSON.parse(localStorage.getItem("cartFood") || "[]");
  // let cartRegular = JSON.parse(localStorage.getItem("cartRegular") || "[]");
  // let cartSpecial = JSON.parse(localStorage.getItem("cartSpecial") || "[]");

  let totalQuantity = 0;

  const calculateQuantity = (cart) => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  totalQuantity += calculateQuantity(cart);

  // totalQuantity += calculateQuantity(cartCoffee);
  // totalQuantity += calculateQuantity(cartFood);
  // totalQuantity += calculateQuantity(cartRegular);
  // totalQuantity += calculateQuantity(cartSpecial);

  return totalQuantity;
}
