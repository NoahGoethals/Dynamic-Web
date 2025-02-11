document.querySelector('#bereken').addEventListener('click', function() {
    const getal1 = document.querySelector('#getal1').value;
    const getal2 = document.querySelector('#getal2').value;

    const som = parseFloat(getal1) + parseFloat(getal2);

    document.querySelector('#resultaat').textContent = 'Resultaat: ' + som;
});
