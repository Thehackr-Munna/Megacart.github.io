document.addEventListener('DOMContentLoaded', () => {
  
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            
            const savedUser = JSON.parse(localStorage.getItem('user'));

           
            if (savedUser && savedUser.username === username && savedUser.password === password) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'main.html';
            } else {
                document.getElementById('loginError').textContent = 'Invalid username or password';
            }
        });
    }

   
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

       
            if (password !== confirmPassword) {
                document.getElementById('signUpError').textContent = 'Passwords do not match';
                return;
            }

            localStorage.setItem('user', JSON.stringify({ username, email, mobile, password }));
            window.location.href = 'login.html';
        });
    }

    if (window.location.pathname.endsWith('main.html')) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            document.getElementById('usernameDisplay').textContent = currentUser;
        }

        const categories = document.querySelectorAll('ul li');
        categories.forEach(category => {
            category.addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(category.textContent.trim());
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(category.textContent.trim() + ' added to cart');
            });
        });
    }

    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            cartItems.appendChild(li);
        });
    }
});
