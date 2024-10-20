<script>
        // JavaScript for sidebar functionality
        function showSidebar() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.style.display = 'flex';
        }

        function hideSidebar() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.style.display = 'none';
        }

        // Preview functionality
        let previewContainer = document.querySelector('.products-preview');
        let previewBox = previewContainer.querySelectorAll('.preview');

        document.querySelectorAll('.products-container .product').forEach(product => {
            product.onclick = () => {
                previewContainer.style.display = 'flex';
                let name = product.getAttribute('data-name');
                previewBox.forEach(preview => {
                    let target = preview.getAttribute('data-target');
                    if (name == target) {
                        preview.classList.add('active');
                    }
                });
            };
        });

        previewBox.forEach(close => {
            close.querySelector('.fa-times').onclick = () => {
                close.classList.remove('active');
                previewContainer.style.display = 'none';
            };
        });

        // Cart functionality
        function addToCart(productId) {
            const productElement = document.querySelector(`.preview[data-target="${productId}"]`);
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = productElement.querySelector('.price').innerText;
            const productImage = productElement.querySelector('img').src;

            const cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.id === productId);
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${productName} added to cart!`);
        }

        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
            document.getElementById('cart-count').textContent = cartCount;
            document.getElementById('cart-count').style.display = cartCount > 0 ? 'inline-block' : 'none';
        }

        // Initialize cart count on page load
        document.addEventListener('DOMContentLoaded', () => {
            updateCartCount();
        });
    </script>