const products = [
    // WOMEN WEAR
    { id: 1, name: "Designer Kurti", price: 1299, category: "Women Wear", img: "https://www.bhamadesigns.com/cdn/shop/products/BHKS514_1.jpg?v=1753699549" },
    { id: 2, name: "Silk Saree", price: 2499, category: "Women Wear", img: "https://assets0.mirraw.com/images/12634941/image_zoom.jpeg?1719750089" },

    // MEN WEAR
    { id: 11, name: "Formal Shirt", price: 999, category: "Men Wear", img: "https://m.media-amazon.com/images/I/81mkAGnBROL._AC_UY1100_.jpg" },
    { id: 12, name: "Casual Denim", price: 1599, category: "Men Wear", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrfsJiGC6D57387vPjNBDIJ96IkGxPSaG9CA&s=170667a" },
    
    // WATCHES
    { id: 21, name: "Luxury Watch", price: 2999, category: "Watches", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQrDcZjXFs6liI-oBTHPwBb2X87UtenAJfqw&s" },
    { id: 22, name: "Sport Watch", price: 1999, category: "Watches", img: "https://springkart.in/cdn/shop/files/ks85x_512.webp?v=1725277135" },

    // BAGS
    { id: 41, name: "Ladies Handbag", price: 2100, category: "Bags", img: "https://www.jiomart.com/images/product/original/rv32w6qoy7/shamriz-women-s-girl-s-flap-over-sling-bag-ladies-purse-handbag-cross-body-sling-handbags-for-women-pink-product-images-rv32w6qoy7-1-202301310134.jpg?im=Resize=(500,630)" },
    { id: 42, name: "Laptop bages", price: 1800, category: "Bags", img: "https://www.luggagefactory.com/cdn/shop/products/412TJC7Tf9L_600x600.jpg?v=1630001816" },
];


function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (isLoggedIn) {
        if(loginBtn) loginBtn.style.display = 'none';
        if(logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if(loginBtn) loginBtn.style.display = 'block';
        if(logoutBtn) logoutBtn.style.display = 'none';
    }
}


function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    alert("Logged out successfully!");
    window.location.href = "login.html"; 
}

function loadProducts(data = products) {
    const container = document.getElementById('product-container');
    if(!container) return;
    container.innerHTML = '';

    const categories = ["Women Wear", "Men Wear", "Watches", "Bags"];

    categories.forEach(cat => {
        const filtered = data.filter(p => p.category === cat);
        if(filtered.length > 0) {
            let section = `
                <div style="width:100%; margin-bottom:30px; clear:both; display:inline-block;">
                    <h2 style="border-bottom:2px solid #000; padding:10px; font-family:sans-serif; text-align:left;">${cat}</h2>
                    <div style="display:flex; flex-wrap:wrap; justify-content:center;">
            `;

            filtered.forEach(p => {
                section += `
                    <div style="width:250px; margin:15px; border:1px solid #ddd; padding:15px; background:#fff; text-align:center; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <img src="${p.img}" alt="${p.name}" style="width:100%; height:250px; object-fit:cover; border-radius:8px;">
                        <h4 style="margin:15px 0 5px 0; color:#333;">${p.name}</h4>
                        <p style="font-weight:bold; color:#000; font-size:1.1rem;">₹${p.price}</p>
                        <button onclick="addToCart(${p.id})" style="width:100%; padding:10px; background:#000; color:#fff; border:none; cursor:pointer; border-radius:6px; font-weight:bold;">Add to Cart</button>
                    </div>
                `;
            });
            section += `</div></div>`;
            container.innerHTML += section;
        }
    });
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.toLowerCase().trim();
    
   
    const filteredResults = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    
    loadProducts(filteredResults);
}

document.addEventListener('DOMContentLoaded', () => {
    const sInput = document.getElementById('search-input');
    
    if (sInput) {
       
        sInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        sInput.addEventListener('input', handleSearch);
    }
});


function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const item = products.find(p => p.id === id);
    
    const existingItem = cart.find(c => c.id === id);
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    localStorage.setItem('myCart', JSON.stringify(cart));
    alert(item.name + " Added to Cart!");
}


window.onload = () => {
    checkAuthStatus();
    loadProducts();
};
