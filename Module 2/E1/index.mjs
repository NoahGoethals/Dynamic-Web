'use strict';

let scores = []; 

document.querySelector('#addScore').addEventListener('click', function() {
    let scoreInput = document.querySelector('#score');
    let score = parseFloat(scoreInput.value); 

    if (score >= 0 && score <= 20) {
        scores.push(score); 
        updateStats(); 
        updateScoreList(); 
    } else {
        alert('Voer een geldige score in (0-20).');
    }

    scoreInput.value = ''; 
});

function updateStats() {
    let total = scores.reduce((sum, num) => sum + num, 0); 
    let average = scores.length ? (total / scores.length).toFixed(2) : 0; 
    let highest = scores.length ? Math.max(...scores) : 0; 

    document.querySelector('#average').textContent = average;
    document.querySelector('#highest').textContent = highest;
}

function updateScoreList() {
    let list = document.querySelector('#scoreList');
    list.innerHTML = ''; 
    scores.forEach(score => {
        let li = document.createElement('li');
        li.textContent = `Score: ${score}`;
        list.appendChild(li);
    });
}
