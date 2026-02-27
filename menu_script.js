// 1. GET TABLE NUMBER FROM URL (e.g., ?table=5)
const urlParams = new URLSearchParams(window.location.search);
const tableNum = urlParams.get('table') || "Walking-Customer";

// 2. CONFIGURATION - Update the phone number here!
const HOTEL_WHATSAPP_NUMBER = "918847231859"; // Use country code, no '+' or spaces
let cart = [];

// 3. YOUR MENU DATA (Add more items here)
const menuData = [
    { 
        category: "Breakfast Specials",
        items: [
            { id: 1, name: "Masala Dosa", price: 80, img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500", desc: "Crispy with potato masala" },
            { id: 2, name: "Idli Sambar", price: 50, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500", desc: "Soft steamed rice cakes" }
        ]
    },
    {
        category: "Main Course",
        items: [
            { id: 3, name: "Paneer Butter Masala", price: 180, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500", desc: "Rich and creamy cottage cheese" },
            { id: 4, name: "Veg Biryani", price: 220, img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500", desc: "Aromatic basmati rice" }
        ]
    }
];

// 4. RENDER THE MENU ON PAGE LOAD
function loadMenu() {
    const display = document.getElementById('menu-display');
    if(!display) return;

    display.innerHTML = ""; // Clear existing
    
    menuData.forEach(section => {
        let sectionHtml = `<h3 class="category-title mt-4">${section.category}</h3><div class="row">`;
        
        section.items.forEach(item => {
            sectionHtml += `
                <div class="col-6 col-md-4 mb-3">
                    <div class="card menu-card h-100">
                        <img src="${item.img}" class="dish-img" alt="${item.name}">
                        <div class="card-body p-2 d-flex flex-column justify-content-between">
                            <div>
                                <h6 class="fw-bold mb-1">${item.name}</h6>
                                <p class="text-success fw-bold mb-2">₹${item.price}</p>
                            </div>
                            <button class="btn btn-sm btn-dark w-100" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add +</button>
                        </div>
                    </div>
                </div>`;
        });
        display.innerHTML += sectionHtml + `</div>`;
    });
}

// 5. CART LOGIC
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const summaryDiv = document.getElementById('cart-summary');
    if(!summaryDiv) return;

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    if (cartCount > 0) {
        summaryDiv.style.display = 'block';
        summaryDiv.innerHTML = `
            <div class="container d-flex justify-content-between align-items-center">
                <div>
                    <span class="badge bg-dark">${cartCount} Items</span>
                    <h5 class="m-0 text-success">Total: ₹${cartTotal}</h5>
                </div>
                <button class="btn btn-success px-4 py-2 fw-bold" onclick="sendOrder()">Place Order</button>
            </div>
        `;
    } else {
        summaryDiv.style.display = 'none';
    }
}

// 6. WHATSAPP INTEGRATION
function sendOrder() {
    if (cart.length === 0) return;

    // Build the text message
    let message = `*NEW ORDER - TABLE ${tableNum}*\n`;
    message += `--------------------------\n`;
    
    cart.forEach(item => {
        message += `• ${item.name} (x${item.qty}) - ₹${item.price * item.qty}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    message += `--------------------------\n`;
    message += `*TOTAL BILL: ₹${total}*`;

    // Encode and Open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Start everything
loadMenu();