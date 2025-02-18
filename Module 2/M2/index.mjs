'use strict';

let students = {
    Alex: [],
    Sam: [],
    Jo: []
};

document.querySelector('#addGrade').addEventListener('click', function() {
    let studentName = document.querySelector('#student').value;
    let course = document.querySelector('#course').value;
    let grade = parseFloat(document.querySelector('#grade').value);

    if (course && grade >= 0 && grade <= 20) {
        students[studentName].push({ course, grade }); 
        updateOverview(); 
    } else {
        alert('Voer een geldige vaknaam en score (0-20) in.');
    }

    document.querySelector('#course').value = ''; 
    document.querySelector('#grade').value = '';
});

function updateOverview() {
    let overview = document.querySelector('#studentOverview');
    overview.innerHTML = ''; 

    for (let studentName in students) {
        let results = students[studentName];

        if (results.length > 0) {
            let total = results.reduce((sum, item) => sum + item.grade, 0);
            let average = (total / results.length).toFixed(2);
            let highest = Math.max(...results.map(item => item.grade));
            let lowest = Math.min(...results.map(item => item.grade));

            let studentCard = `
                <h2>${studentName}</h2>
                <p>Gemiddelde score: ${average}</p>
                <p>Hoogste score: ${highest}</p>
                <p>Laagste score: ${lowest}</p>
                <h3>Vakken en scores:</h3>
                <ul>
                    ${results.map(item => `<li>${item.course}: ${item.grade}</li>`).join('')}
                </ul>
            `;

            let div = document.createElement('div');
            div.innerHTML = studentCard;
            overview.appendChild(div);
        }
    }
}
