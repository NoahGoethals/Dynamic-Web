'use strict';

let cart = []; 

document.querySelector('#addToCart').addEventListener('click', function() {
    let name = document.querySelector('#productName').value;
    let price = parseFloat(document.querySelector('#productPrice').value);

    if (name && price > 0) {
        cart.push({ name, price }); 
        updateCart(); 
    } else {
        alert('Voer een geldige productnaam en prijs in.');
    }

    document.querySelector('#productName').value = '';
    document.querySelector('#productPrice').value = '';
});

document.querySelector('#sortByPrice').addEventListener('click', function() {
    cart.sort((a, b) => a.price - b.price); 
    updateCart(); 
});

function updateCart() {
    let list = document.querySelector('#cartItems');
    list.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((product, index) => {
        totalPrice += product.price; 

        let li = document.createElement('li');
        li.textContent = `${product.name} - €${product.price.toFixed(2)}`;

        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Verwijder';
        removeBtn.addEventListener('click', function() {
            cart.splice(index, 1); 
            updateCart(); 
        });

        li.appendChild(removeBtn);
        list.appendChild(li);
    });

    document.querySelector('#total').textContent = totalPrice.toFixed(2); 
}
