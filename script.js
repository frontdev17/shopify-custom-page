const client = ShopifyBuy.buildClient({
  domain: 'martins-portfolio-demo.myshopify.com', 
  storefrontAccessToken: 'fea3071ffbdbcccf3989fc5c767c0db6',
});

let totalPrice = 0;

// Fetch products and display them
client.product.fetchAll()
  .then((products) => {
    console.log("✅ Products successfully fetched:", products);
    displayProducts(products);
  })
  .catch((error) => {
    console.error("❌ Error fetching products:", error);
  });

function displayProducts(products) {
  const productContainer = document.getElementById('product-container');

  if (!products || products.length === 0) {
    productContainer.innerHTML = "<p style='color: white;'>No products available.</p>";
    return;
  }

  products.forEach((product) => {
    const defaultPrice = parseFloat(product.variants[0]?.price?.amount || 0);
    const currency = product.variants[0]?.price?.currencyCode || "USD";

    let variantOptions = "";
    product.variants.forEach((variant) => {
      variantOptions += `<option value="${variant.id}" data-price="${variant.price.amount}">
                          ${variant.title} - $${variant.price.amount} ${currency}
                        </option>`;
    });

    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.images[0]?.src || 'https://via.placeholder.com/200'}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>Price: <span class="product-price">$${defaultPrice.toFixed(2)} ${currency}</span></p>

        <label for="variant-${product.id}">Choose an option:</label>
        <select id="variant-${product.id}" class="variant-selector" onchange="updatePrice('${product.id}')">
          ${variantOptions}
        </select>

        <button onclick="addToCart('${product.id}')">Add to Cart</button>
      </div>
    `;
  });
}

function checkoutAlert() {
  alert("🚀 Checkout is not available in demo mode.");
}
