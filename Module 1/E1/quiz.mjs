'use strict';

    let naam = prompt("Wat is je naam?");
    let score = 0;
    alert(`welkom bij de quiz, ${naam}!`);


    let vraag1 = prompt("Wie heeft de meeste Ballon d'Or titels gewonnen?");
    if (vraag1.toLowerCase() === 'lionel messi' || vraag1.toLowerCase() === 'messi') {
        alert("Goed gedaan!");
        score++;
    } else {
        alert("Fout! Het juiste antwoord is Lionel Messi.");
    }

    let vraag2 = prompt("Welke club heeft de meeste Champions League titels gewonnen?");
    if (vraag2.toLowerCase() === 'real madrid') {
        alert("Goed gedaan!");
        score++;
    } else {
        alert("Fout! Het juiste antwoord is Real Madrid.");
    }

    let vraag3 = prompt("In welk jaar won Nederland het EK voetbal?");
    if (vraag3 === '1988') {
        alert("Goed gedaan!");
        score++;
    } else {
        alert("Fout! Het juiste antwoord is 1988.");
    }

    alert(naam + ", je hebt " + score + " van de 3 vragen goed beantwoord!");

