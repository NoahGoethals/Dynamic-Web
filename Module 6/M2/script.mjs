document.addEventListener("DOMContentLoaded", async () => {
    const zoekveld = document.getElementById("zoekterm");
    const sorteerveld = document.getElementById("sorteer");
    const limietveld = document.getElementById("limiet");
    const toepassenKnop = document.getElementById("toepassen");
    const postsContainer = document.getElementById("posts-container");

    let posts = [];

    // Haal de posts op bij het laden van de pagina
    async function haalPostsOp() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) throw new Error(`Fout bij ophalen: ${response.status}`);
            posts = await response.json();
            toonPosts();
        } catch (error) {
            postsContainer.innerHTML = `<p class="geen-resultaten">Er is een fout opgetreden: ${error.message}</p>`;
        }
    }

    // Filter, sorteer en beperk de posts
    function toonPosts() {
        let gefilterdePosts = [...posts];

        // Filteren op zoekterm
        const zoekterm = zoekveld.value.toLowerCase().trim();
        if (zoekterm) {
            gefilterdePosts = gefilterdePosts.filter(post =>
                post.title.toLowerCase().includes(zoekterm)
            );
        }

        // Sorteren
        const sorteermethode = sorteerveld.value;
        gefilterdePosts.sort((a, b) => {
            if (sorteermethode === "titel-oplopend") {
                return a.title.localeCompare(b.title);
            } else if (sorteermethode === "titel-aflopend") {
                return b.title.localeCompare(a.title);
            } else if (sorteermethode === "id-oplopend") {
                return a.id - b.id;
            } else if (sorteermethode === "id-aflopend") {
                return b.id - a.id;
            }
        });

        // Beperk aantal posts
        const limiet = parseInt(limietveld.value);
        gefilterdePosts = gefilterdePosts.slice(0, limiet);

        // Weergeven in HTML
        postsContainer.innerHTML = "";
        if (gefilterdePosts.length === 0) {
            postsContainer.innerHTML = `<p class="geen-resultaten">Geen posts gevonden</p>`;
            return;
        }

        gefilterdePosts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <div class="post-titel">${post.title}</div>
                <div class="post-body">${post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body}</div>
                <div class="post-info">
                    <span>Post ID: ${post.id}</span>
                    <span>Gebruiker ID: ${post.userId}</span>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Event listener voor de "Toepassen"-knop
    toepassenKnop.addEventListener("click", toonPosts);

    // Haal de posts op bij het laden van de pagina
    haalPostsOp();
});
