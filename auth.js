
document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundPosition = "center";

function toggleForm() {
    const signup = document.getElementById('signup-form');
    const login = document.getElementById('login-form');
    
    if (signup.style.display === "none" || signup.style.display === "") {
        signup.style.display = "block";
        login.style.display = "none";
    } else {
        signup.style.display = "none";
        login.style.display = "block";
    }
}


function registerUser() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if(name === "" || email === "" || pass === "") {
        alert("Please fill all fields!");
        return;
    }

    const userData = { name, email, pass };
    localStorage.setItem(email, JSON.stringify(userData));
    
    alert("Registration Successful! Now please Login.");
    toggleForm(); 

}
function loginUser() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    
    const storedData = localStorage.getItem(email);
    
    if (storedData) {
        const user = JSON.parse(storedData);
        
        if (user.pass === pass) {
           
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', user.name);
            
            alert("Login Successful! Redirecting to Home...");
            
            
            window.location.href = "index.html"; 
           
        } else {
            alert("Wrong Password!");
        }
    } else {
        alert("User not found! Please register first.");
    }
}
