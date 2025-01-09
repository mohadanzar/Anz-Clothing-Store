// Product data
const products = [
    { name: 'Core Hoddie', price: '$125', image: '/img/clothing-1.png' },
    { name: 'Stylish Backpack', price: '$115', image: '/img/clothing-2.png' },
    { name: 'Premiere Pants', price: '$125', image: '/img/clothing-3.png' },
    { name: 'Black Shorts', price: '$75', image: '/img/clothing-4.png' },
    { name: 'Cool T-Shirt', price: '$65', image: '/img/clothing-5.png' }
];

// DOM Elements
const productsContainer = document.querySelector('.products-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const mainImage = document.querySelector('.main-image');
const prevImage = document.querySelector('.prev .side-image');
const nextImage = document.querySelector('.next .side-image');
const productName = document.querySelector('.product-name');
const productPrice = document.querySelector('.product-price');

let currentIndex = 1; // Start with Core Hoodie

function updateProducts() {
    // Calculate indexes for prev and next products
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    const nextIndex = (currentIndex + 1) % products.length;
    
    // Fade out
    productsContainer.style.opacity = 0;
    
    setTimeout(() => {
        // Update images and info
        prevImage.src = products[prevIndex].image;
        mainImage.src = products[currentIndex].image;
        nextImage.src = products[nextIndex].image;
        
        productName.textContent = products[currentIndex].name;
        productPrice.textContent = products[currentIndex].price;
        
        // Fade in
        productsContainer.style.opacity = 1;
    }, 300);
}

function nextProduct() {
    currentIndex = (currentIndex + 1) % products.length;
    updateProducts();
}

function prevProduct() {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    updateProducts();
}

// Event Listeners
prevBtn.addEventListener('click', prevProduct);
nextBtn.addEventListener('click', nextProduct);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevProduct();
    } else if (e.key === 'ArrowRight') {
        nextProduct();
    }
});

// Touch swipe functionality
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevProduct();
        } else {
            nextProduct();
        }
    }
}

// Language toggle
const languageToggle = document.querySelector('.language-toggle');
languageToggle.addEventListener('click', () => {
    languageToggle.textContent = 
        languageToggle.textContent === 'ES | EN' ? 'EN | ES' : 'ES | EN';
});

// Initialize
updateProducts();