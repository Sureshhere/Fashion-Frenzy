// ----------EMAIL JS------------
(function () {
    emailjs.init('4eADoZRzYEHUAVlKh'); // Replace with your User ID
})();


// ------------------- ADD TO CART------------------
window.onload = function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        this.contact_number.value = Math.random() * 100000 | 0;

        var cartItems = getCartItemsFromStorage();
        this.cartItems.value = JSON.stringify(cartItems); // Update cartItems input value

        emailjs.sendForm('service_xyzrwi9', 'template_8pqbs0h', this)
            .then(function () {
                console.log('SUCCESS!');
                showCart();
            }, function (error) {
                console.log('FAILED...', error);
            });
    });
    showCart();

}

function showCart() {
    var cartItems = getCartItemsFromStorage();
    var cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = '';

    if (cartItems.length === 0) {
        var emptyCartItem = document.createElement('li');
        emptyCartItem.className = 'list-group-item';
        emptyCartItem.textContent = 'Cart is empty';
        cartItemsList.appendChild(emptyCartItem);
    } else {
        cartItems.forEach(function (item) {
            var cartItem = document.createElement('li');
            cartItem.className = 'list-group-item';
            cartItem.textContent = item;

            var removeButton = document.createElement('button');
            removeButton.className = 'btn btn-danger btn-sm float-end';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                removeItemFromCart(item);
            });

            cartItem.appendChild(removeButton);
            cartItemsList.appendChild(cartItem);
        });
    }

    var cartItemsInput = document.getElementById('cartItems');
    cartItemsInput.value = JSON.stringify(cartItems);

    var outputElement = document.getElementById('output');
    var arrayString = cartItems.join(', ');
    outputElement.innerHTML = arrayString;
}

function getCartItemsFromStorage() {
    var cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

function removeItemFromCart(item) {
    var cartItems = getCartItemsFromStorage();
    var index = cartItems.indexOf(item);

    if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        showCart();
    }
}

function addToCart(button) {
    var item = button.getAttribute('data-item');
    var cartItems = getCartItemsFromStorage();
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


// ---------- add to cart popover-----------
$(function () {
    $('.popover-button').popover({
        content: 'Item added to the cart 🛒✅',
        trigger: 'manual',
        placement: 'bottom'
    }).on('shown.bs.popover', function () {
        var popover = $(this);
        setTimeout(function () {
            popover.popover('hide');
        }, 1500);
    });

    $('.popover-button').click(function () {
        $(this).popover('show');
    });
});