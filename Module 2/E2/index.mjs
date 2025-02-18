'use strict';

document.querySelector('#generateCard').addEventListener('click', function() {
    let recipeName = document.querySelector('#recipeName').value;
    let prepTime = document.querySelector('#prepTime').value;
    let ingredientsText = document.querySelector('#ingredients').value;

    let ingredients = ingredientsText.split('\n').filter(ingredient => ingredient.trim() !== '');

    if (recipeName && prepTime && ingredients.length > 0) {
        let recipeCard = `
            <h2>🥘 ${recipeName}</h2>
            <p>⏱️ Bereidingstijd: ${prepTime} minuten</p>
            <h3>Ingrediënten:</h3>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        `;

        document.querySelector('#result').innerHTML = recipeCard; 
    } else {
        alert('Vul alle velden in om een receptkaart te genereren.');
    }
});
