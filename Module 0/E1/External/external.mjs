document.querySelector('#greetingButton').addEventListener('click', function() {
    if (this.textContent === 'Hallo!') {
        this.textContent = 'Tot ziens!';
    } else {
        this.textContent = 'Hallo!';
    }
});
