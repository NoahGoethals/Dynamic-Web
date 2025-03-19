document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("gebruikers-container");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`Fout bij ophalen: ${response.status}`);
        }

        const gebruikers = await response.json();
        
        container.innerHTML = "";

        gebruikers.forEach(gebruiker => {
            const kaart = document.createElement("div");
            kaart.classList.add("gebruiker-kaart");
            kaart.innerHTML = `
                <div class="gebruiker-naam">${gebruiker.name}</div>
                <div class="gebruiker-email">${gebruiker.email}</div>
                <div>${gebruiker.phone}</div>
            `;
            container.appendChild(kaart);
        });
    } catch (error) {
        container.innerHTML = `<p class="error-melding">Er is iets misgegaan: ${error.message}</p>`;
    }
});
