document.querySelector('#themaKnop').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    
    if (document.body.classList.contains('dark-theme')) {
        this.textContent = 'Licht thema'; 
    } else {
        this.textContent = 'Donker thema'; 
    }
});
