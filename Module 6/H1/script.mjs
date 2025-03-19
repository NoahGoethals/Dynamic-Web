const API_KEY = "JOUW_API_SLEUTEL"; 

document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const searchButton = document.getElementById("search-button");
    const weatherDisplay = document.getElementById("weather-display");
    const favoritesList = document.getElementById("favorites-list");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    searchButton.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            haalWeerOp(city);
        }
    });


    async function haalWeerOp(city) {
        weatherDisplay.innerHTML = "<p class='loading'>Laden...</p>";

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            if (!response.ok) throw new Error(`Kan ${city} niet vinden`);

            const data = await response.json();
            toonWeer(data);
        } catch (error) {
            weatherDisplay.innerHTML = `<p class="error">${error.message}</p>`;
        }
    }


    function toonWeer(data) {
        const tempCelsius = data.main.temp;
        const tempFahrenheit = (tempCelsius * 9/5 + 32).toFixed(1);
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        let isCelsius = true;

        weatherDisplay.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>${data.weather[0].description}</strong></p>
                <p id="temperature">${tempCelsius}°C</p>
                <p>Luchtvochtigheid: ${data.main.humidity}%</p>
                <p>Windsnelheid: ${data.wind.speed} m/s</p>
                <p>Zonsopgang: ${sunriseTime}</p>
                <p>Zonsondergang: ${sunsetTime}</p>
                <button id="fav-button">⭐ Favoriet</button>
                <p class="temp-toggle">Wissel °C / °F</p>
            </div>
        `;

     
        document.querySelector(".temp-toggle").addEventListener("click", () => {
            const tempElement = document.getElementById("temperature");
            isCelsius = !isCelsius;
            tempElement.textContent = isCelsius ? `${tempCelsius}°C` : `${tempFahrenheit}°F`;
        });

        document.getElementById("fav-button").addEventListener("click", () => {
            if (!favorites.includes(data.name)) {
                favorites.push(data.name);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                toonFavorieten();
            }
        });
    }

    function toonFavorieten() {
        favoritesList.innerHTML = "";
        favorites.forEach(city => {
            const favItem = document.createElement("div");
            favItem.classList.add("favorite-item");
            favItem.textContent = city;
            favItem.addEventListener("click", () => haalWeerOp(city));
            favoritesList.appendChild(favItem);
        });
    }

    toonFavorieten();
});
