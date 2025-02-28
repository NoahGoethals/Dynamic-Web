const maakBestelling = (drank = "cola", snack = "chips") => ({
    drank,
    snack,
    tijd: new Date().toLocaleTimeString()
});

const bestelling1 = maakBestelling();
const bestelling2 = maakBestelling("fanta");
const bestelling3 = maakBestelling("sprite", "nootjes");

const output = document.getElementById('output');
output.innerHTML += `Bestelling 1: ${bestelling1.drank} & ${bestelling1.snack} om ${bestelling1.tijd}<br>`;
output.innerHTML += `Bestelling 2: ${bestelling2.drank} & ${bestelling2.snack} om ${bestelling2.tijd}<br>`;
output.innerHTML += `Bestelling 3: ${bestelling3.drank} & ${bestelling3.snack} om ${bestelling3.tijd}<br>`;
