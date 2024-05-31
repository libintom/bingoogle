async function search() {
    const query = document.getElementById("searchInput").value;
    const aiToggle = document.getElementById("aiToggle").checked;
    const searchResults = document.getElementById("searchResults");

    // Fetch Google search results
    const googleResults = await fetchGoogleResults(query, aiToggle);

    // Fetch Bing search results
    const bingResults = await fetchBingResults(query, aiToggle);

    // Display results
    searchResults.innerHTML = `
        <div class="google-results">
            <h2>Google Results:</h2>
            ${googleResults.join("<br>")}
        </div>
        <div class="bing-results">
            <h2>Bing Results:</h2>
            ${bingResults.join("<br>")}
        </div>
    `;
}

// Fetch Google search results
async function fetchGoogleResults(query, aiToggle) {
    try {
        const response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=${aiToggle ? "isch" : ""}`);
        const html = await response.text();

        // Parse the HTML using DOM manipulation (e.g., with DOMParser)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Extract relevant data (titles, URLs, etc.) from the search results
        const googleResults = Array.from(doc.querySelectorAll(".tF2Cxc")).map(result => {
            const title = result.querySelector(".DKV0Md").textContent;
            const url = result.querySelector("a").getAttribute("href");
            return `<a href="${url}">${title}</a>`;
        });

        return googleResults;
    } catch (error) {
        console.error("Error fetching Google results:", error);
        return [];
    }
}

// Fetch Bing search results
async function fetchBingResults(query, aiToggle) {
    try {
        const response = await fetch(`https://www.bing.com/search?q=${encodeURIComponent(query)}&qft=${aiToggle ? "+filterui:imagesize-medium" : ""}`);
        const html = await response.text();

        // Parse the HTML using DOM manipulation (e.g., with DOMParser)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Extract relevant data (titles, URLs, etc.) from the search results
        const bingResults = Array.from(doc.querySelectorAll(".b_algo")).map(result => {
            const title = result.querySelector("h2").textContent;
            const url = result.querySelector("a").getAttribute("href");
            return `<a href="${url}">${title}</a>`;
        });

        return bingResults;
    } catch (error) {
        console.error("Error fetching Bing results:", error);
        return [];
    }
}
