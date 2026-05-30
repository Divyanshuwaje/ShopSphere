const products = [
    {
        id: 1,
        name: "Wireless Noise-Cancelling Headphones",
        price: 14999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    },
    {
        id: 2,
        name: "Minimalist Smartwatch Series 5",
        price: 19999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
    },
    {
        id: 3,
        name: "Classic Denim Jacket",
        price: 2499,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80"
    },
    {
        id: 4,
        name: "Premium Leather Backpack",
        price: 4999,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80"
    },
    {
        id: 5,
        name: "Ultra HD 4K Monitor",
        price: 28500,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527443224734-d9bc21ad8790?w=500&q=80"
    },
    {
        id: 6,
        name: "Classic White Sneakers",
        price: 3499,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80"
    },
    {
        id: 7,
        name: "Polarized Sunglasses",
        price: 1299,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80"
    },
    {
        id: 8,
        name: "Comfort Cotton T-Shirt",
        price: 799,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const cartBadge = document.getElementById('cartBadge');
const toast = document.getElementById('toast');
const noResults = document.getElementById('noResults');

let cartCount = 0;
let toastTimeout;

// Initialize App
function init() {
    renderProducts(products);
    setupEventListeners();
}

// Render Products
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        `;
        productsGrid.appendChild(card);
    });
}

// Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
}

// Filter Logic
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    productsGrid.style.opacity = '0';
    
    setTimeout(() => {
        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                  product.category.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'All' || product.category === category;
            return matchesSearch && matchesCategory;
        });
        
        renderProducts(filtered);
        productsGrid.style.opacity = '1';
    }, 200);
}

// Add to Cart Functionality
window.addToCart = function(productId) {
    cartCount++;
    cartBadge.textContent = cartCount;
    
    // Add animation to badge
    cartBadge.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartBadge.style.transform = 'scale(1)';
    }, 200);
    
    showToast();
};

// Toast Notification
function showToast() {
    clearTimeout(toastTimeout);
    toast.classList.add('show');
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Sticky Header Effect on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.75rem 0';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
        header.style.padding = '1rem 0';
    }
});

// Run Init
init();