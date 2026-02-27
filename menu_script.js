const menuData = [
    { id: 1, name: "Masala Dosa", price: 80, category: "Breakfast", desc: "Crispy with potato filling" },
    { id: 2, name: "Idli Sambar", price: 50, category: "Breakfast", desc: "Two steamed rice cakes" },
    { id: 3, name: "Filter Coffee", price: 30, category: "Drinks", desc: "Authentic South Indian brew" },
    { id: 4, name: "Veg Biryani", price: 150, category: "Main Course", desc: "Aromatic basmati rice with veggies" }
];

const container = document.getElementById('menu-container');

// Function to render the menu
function renderMenu() {
    let currentCategory = "";
    
    menuData.forEach(item => {
        // Add a category header if it changes
        if (item.category !== currentCategory) {
            currentCategory = item.category;
            container.innerHTML += `<h3 class="category-header">${currentCategory}</h3>`;
        }

        // Generate the HTML for each item
        const itemHtml = `
            <div class="card menu-card p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-1">${item.name}</h5>
                        <small class="text-muted">${item.desc}</small>
                    </div>
                    <div class="price">₹${item.price}</div>
                </div>
            </div>
        `;
        container.innerHTML += itemHtml;
    });
}

renderMenu();