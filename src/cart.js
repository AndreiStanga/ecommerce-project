window.addEventListener("load", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  let total = 0;
  if (cart) {
    cart.forEach((product) => {
      total = total + Number(product.price) * product.noOfProducts;
      console.log(product.price);
    });

    const productCards = cart
      .map(
        (product) =>
          `<div class="card w-75 ">
            <div class="card-body">
            <img class="details-img"src="/ecommerce-project/images/product${product.id}.jpg" alt="" />
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.price}</p>
              <p class="card-text">Number of products:
                <button  data-product-id=${product.id} class="decrement btn btn-secondary">-</button>
                  <span class="no-of-products">${product.noOfProducts}</span>
                <button  data-product-id=${product.id} class="increment btn btn-secondary ">+</button>
              </p>
            </div>
            <button  data-product-id=${product.id} class="delete btn btn-secondary">DELETE</button>
          </div>`
      )
      .join("");

    let totalPriceCard = `<div>TOTAL : ${total}</div>`;
    document.querySelector(".cart-container").innerHTML = productCards;
    document.querySelector(".total-price-container").innerHTML = totalPriceCard;
  }
});

const cartContainer = document.querySelector(".cart-container");
cartContainer.addEventListener("click", handleCartActions);

function handleCartActions(event) {
  const targetButton = event.target;
  let cart = JSON.parse(localStorage.getItem("cart"));
  const productInCart = cart.find(
    (productFromCart) =>
      productFromCart.id == targetButton.getAttribute("data-product-id")
  );
  let quantityParagraph = targetButton.parentNode;

  if (targetButton.classList.contains("increment")) {
    productInCart.noOfProducts++;
  } else if (targetButton.classList.contains("decrement")) {
    if (productInCart.noOfProducts > 1) productInCart.noOfProducts--;
  } else if (targetButton.classList.contains("delete")) {
    productInCart.noOfProducts = 0;
    cart = cart.filter((product) => product.id != productInCart.id);
    targetButton.parentNode.remove();
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  if (productInCart) {
    quantityParagraph.querySelector(".no-of-products").innerHTML =
      productInCart.noOfProducts;

    let total = 0;
    cart.forEach((product) => {
      total = total + Number(product.price) * product.noOfProducts;
      console.log(product.price);
    });
    let totalPriceCard = `<div>TOTAL : ${total}</div>`;
    document.querySelector(".total-price-container").innerHTML = totalPriceCard;
  }
}
