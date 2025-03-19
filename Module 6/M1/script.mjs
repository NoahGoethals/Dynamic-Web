document.addEventListener("DOMContentLoaded", () => {
    const knoppen = document.querySelectorAll(".endpoint-knop");
    const statusInfo = document.getElementById("status-info");
    const responseDetails = document.getElementById("response-details");

    knoppen.forEach(knop => {
        knop.addEventListener("click", async () => {
            const code = knop.getAttribute("data-code");
            const url = `https://httpstat.us/${code}`;

            statusInfo.innerHTML = "Bezig met laden...";
            responseDetails.textContent = "";

            try {
                const response = await fetch(url);

                let statusClass = "";
                if (response.status >= 200 && response.status < 300) {
                    statusClass = "status-success";
                } else if (response.status >= 300 && response.status < 400) {
                    statusClass = "status-redirect";
                } else if (response.status >= 400 && response.status < 500) {
                    statusClass = "status-client-error";
                } else if (response.status >= 500) {
                    statusClass = "status-server-error";
                }

                statusInfo.innerHTML = `
                    <strong class="${statusClass}">${response.status} ${response.statusText}</strong><br>
                    Succesvol: ${response.ok ? "✅ Ja" : "❌ Nee"}<br>
                    Categorie: ${Math.floor(response.status / 100)}00s
                `;

                let headersText = "";
                response.headers.forEach((value, key) => {
                    headersText += `${key}: ${value}\n`;
                });

                responseDetails.textContent = `Response Headers:\n${headersText}\nResponse Type: ${response.type}`;

            } catch (error) {
                statusInfo.innerHTML = `<span class="status-server-error">Fout: ${error.message}</span>`;
                responseDetails.textContent = "";
            }
        });
    });
});
