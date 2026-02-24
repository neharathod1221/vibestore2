
function loadSummary() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let total = 0;
    if(cart.length === 0) {
        alert("Your cart is empty! Going back to shopping.");
        window.location.href = "index.html";
        return;
    }

    cart.forEach(item => {
        total += item.price;
    });

   
    const qtyElement = document.getElementById('summary-qty');
    const totalElement = document.getElementById('summary-total');

    if(qtyElement) qtyElement.innerText = cart.length;
    if(totalElement) totalElement.innerText = total;
}


document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;

    const cartData = JSON.parse(localStorage.getItem('myCart'));

   
    const orderDetails = {
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address,
        items: cartData,
        orderDate: new Date().toLocaleString()
    };

    console.log("Order Placed:", orderDetails);

    
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    
    localStorage.removeItem('myCart'); 

    
    alert("Order Successful! Redirecting...");
    window.location.href = "order-success.html"; 
});


window.onload = loadSummary;