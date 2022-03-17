window.addEventListener("load", async () => {
  let searchParamString = window.location.search;

  const searchParam = new URLSearchParams(searchParamString);
  const productId = searchParam.get("product-id");

  const productURL = `https://622c6d71087e0e041e0b07f6.mockapi.io/products/${productId}`;
  const result = await fetch(productURL);
  const product = await result.json();

  const productCard = `
    <div class="card">
        <div class="card-header">
            Product Details
        </div>
        <div class="card-body">
        <img class="details-img"src="/ecommerce-project/images/product${product.id}.jpg" alt="" />
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${product.price}</p>
             <button data-product-id=${product.id} class=" add-to-cart btn btn-primary">Add to cart</button>
        </div>
    </div>`;

  document.querySelector(".product-details").innerHTML = productCard;
});

document.querySelector(".product-details").addEventListener("click", addToCart);
async function addToCart(event) {
  const addToCartBtn = event.target;
  let productId = addToCartBtn.getAttribute("data-product-id");

  const productURL = `https://622c6d71087e0e041e0b07f6.mockapi.io/products/${productId}`;
  const result = await fetch(productURL);
  const product = await result.json();

  let cart = [];
  if (localStorage.getItem("cart") == null) {
    cart.push({ ...product, noOfProducts: 1 });
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
    const productInCart = cart.find(
      (productFromCart) => productFromCart.id == product.id
    );
    if (productInCart != undefined) {
      productInCart.noOfProducts++;
    } else {
      const productToBeAddedInCart = { ...product, noOfProducts: 1 };
      cart.push(productToBeAddedInCart);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
