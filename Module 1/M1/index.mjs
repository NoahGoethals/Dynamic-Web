'use strict';

const specialElementen = document.getElementsByClassName('special');

for (let i = 0; i < specialElementen.length; i++) {
    specialElementen[i].style.color = 'red';
}

const tweedeParagraaf = document.querySelector('.container p:nth-of-type(2)');
tweedeParagraaf.style.textDecoration = 'underline';

const outputDiv = document.getElementById('output');
outputDiv.textContent = `Aantal speciale elementen: ${specialElementen.length}`;
