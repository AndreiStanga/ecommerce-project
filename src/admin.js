const productTableBody = document.querySelector(".admin-products-table");
const addNewProductBtn = document.querySelector(".add-new-product");
const updateProductBtn = document.querySelector(".update-product");

const productsURL = "https://622c6d71087e0e041e0b07f6.mockapi.io/products";

window.addEventListener("load", getAllProducts);

async function getAllProducts() {
  const result = await fetch(productsURL);
  const products = await result.json();
  const tableRows = products
    .map(
      (product) =>
        `<tr>
              <th scope="row">${product.id}</th>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td><button class="btn btn-danger delete" data-product-id=${product.id}>X</button></td>
              <td><button class="btn btn-primary edit" data-product-id=${product.id}>🖉</button></td>
          </tr>`
    )
    .join("");

  productTableBody.innerHTML = tableRows;
}

productTableBody.addEventListener("click", handleProducts);

async function handleProducts(event) {
  const productId = event.target.getAttribute("data-product-id");
  event.preventDefault();
  if (event.target.classList.contains("delete")) {
    let response = await fetch(`${productsURL}/${productId}`, {
      method: "DELETE",
    });
    console.log(response);
    getAllProducts();
  } else if (event.target.classList.contains("edit")) {
    console.log("edit", productId);
    editProductById(productId);
  }
}

addNewProductBtn.addEventListener("click", addNewProduct);

async function addNewProduct(event) {
  event.preventDefault();
  const newProductName = document.getElementById("name").value;
  const newProductPrice = document.getElementById("price").value;
  const newProductDescription = document.getElementById("description").value;

  let response = await fetch(productsURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newProductName,
      price: newProductPrice,
      description: newProductDescription,
    }),
  });

  let product = await response.json();

  let newproductTableRow = `<tr>
            <th scope="row">${product.id}</th>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="btn btn-danger " data-product-id=${product.id}>X</button></td>
            <td><button class="btn btn-primary " data-product-id=${product.id}>🖉</button></td>
        </tr>`;

  productTableBody.innerHTML += newproductTableRow;
}

updateProductBtn.addEventListener("click", updateProduct);

async function updateProduct(event) {
  event.preventDefault();
  const productName = document.getElementById("name").value;
  const productPrice = document.getElementById("price").value;
  const productDescription = document.getElementById("description").value;
  const productId = document.getElementById("productId").value;

  console.log(productId);

  let response = await fetch(`${productsURL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: productId,
      name: productName,
      price: productPrice,
      description: productDescription,
    }),
  });

  let data = await response.json();
  console.log(data);
  getAllProducts();
}

async function editProductById(productId) {
  event.preventDefault();
  const productNameElement = document.getElementById("name");
  const productPriceElement = document.getElementById("price");
  const productDescriptionElement = document.getElementById("description");
  const productIdHiddenElement = document.getElementById("productId");

  let response = await fetch(`${productsURL}/${productId}`);
  let product = await response.json();

  productNameElement.value = product.name;
  productPriceElement.value = product.price;
  productDescriptionElement.value = product.description;
  productIdHiddenElement.value = product.id;
}
