let cart = [];
const products = [
    { id: 1, name: "DROWSINESS SPECS", category: "Electronics", price: 799, image: "" }
];


document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
});

function displayProducts(productsList) {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";
    productsList.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-card");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="enlargeImage('${product.image}')">
            <h2>${product.name}</h2>
            <p>Price: ₹${product.price}</p>
            <button class="buy-btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

function enlargeImage(imageSrc) {
    document.getElementById("overlay-img").src = imageSrc;
    document.getElementById("overlay").style.display = "flex";
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
}



function searchProducts() {
    let searchInput = document.getElementById("search-input").value.toLowerCase().trim();
    
    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );

    displayProducts(filteredProducts);
}



document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
    checkLoginStatus();
});


const users = [
    { username: "admin", email: "admin@gmail.com", pass: "1234", confirmpass: "1234" },
    { username: "user", email: "user@gmail.com", pass: "1234", confirmpass: "1234" }
];

function toggleLoginModal() {
    let modal = document.getElementById("login-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function login() {
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("pass").value.trim();
    let confirmPassword = document.getElementById("confirmpass").value.trim();

    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match!");
        return;
    }

    let user = users.find(user =>
        user.username === username &&
        user.email === email &&
        user.pass === password
    );

    if (user) {
        localStorage.setItem("loggedInUser", username);
        toggleLoginModal();
        checkLoginStatus();
        alert("Login successful!");
    } else {
        alert("Invalid username, email, or password!");
    }
}
function logout() {
    console.log("Logging out...");
    localStorage.removeItem("loggedInUser");
    checkLoginStatus();
    alert("Logged out successfully!");
}


function checkLoginStatus() {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "inline-block";
        document.getElementById("welcomeText").innerText = `Welcome, ${loggedInUser}`;
    } else {
        document.getElementById("loginButton").style.display = "inline-block";
        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("welcomeText").innerText = "";
    }
}

window.onload = checkLoginStatus;


function addToCart(productName, productPrice) {
    let cartItem = cart.find(item => item.name === productName);

    if (cartItem) {
        cartItem.quantity += 1; 
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    let cartList = document.getElementById("cart-list");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");
    
    cartList.innerHTML = ""; 
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} (₹${item.price}) x ${item.quantity} 
            <button onclick="removeFromCart('${item.name}')">Remove</button>`;
        cartList.appendChild(li);

        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
    });

    cartTotal.innerText = totalPrice;
    cartCount.innerText = totalItems;
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
}


function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-list");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");
    
    cartList.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.product} - ₹${item.price}`;
        cartList.appendChild(listItem);
        total += item.price;
    });
    
    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

function toggleCart() {
    let cartSection = document.getElementById("cart-section");
    cartSection.style.display = cartSection.style.display === "none" ? "block" : "none";
}



