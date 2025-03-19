document.addEventListener("DOMContentLoaded", () => {
    const knop = document.getElementById("haalTekstOp");
    const resultaatDiv = document.getElementById("resultaat");

    knop.addEventListener("click", async () => {
        resultaatDiv.innerHTML = "<p>Bezig met laden...</p>";

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

            if (!response.ok) {
                throw new Error(`Fout bij ophalen: ${response.status}`);
            }

            const data = await response.json();

            resultaatDiv.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.body}</p>
            `;
        } catch (error) {
            resultaatDiv.innerHTML = `<p class="error">Er is iets misgegaan: ${error.message}</p>`;
        }
    });
});
