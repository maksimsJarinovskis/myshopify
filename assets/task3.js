// Function to handle adding product to cart
const addToCart = productId => {
    const formData = {
        'items': [{
            'id': productId,
            'quantity': 1
        }]
    };

    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            window.location.reload();
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

// Function to load a random product
const loadRandomProduct = () => {
    fetch('/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return response.json();
        })
        .then(data => {
            const { products } = data;
            console.log(products);
            const randomProduct = products[0];
            const productName = randomProduct.title;
            const productPrice = randomProduct.variants[0].price;
            const variantId = randomProduct.variants[0].id;

            // Display product details
            const productHtml = `
                    <h2>${productName}</h2>
                    <p>$${productPrice}</p>
                    <button onclick="addToCart(${variantId})">Add to Cart</button>
                  `;
            document.getElementById('product-container').innerHTML = productHtml;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
};

// Load a random product when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadRandomProduct();
});