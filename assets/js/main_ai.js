async function search() {
    const searchInput = document.getElementById("searchInput").value;
    const aiToggle = document.getElementById("aiToggle").checked;
    const searchResults = document.getElementById("searchResults");

    // Fetch Google search results
    const googleResults = await fetchGoogleResults(searchInput, aiToggle);

    // Fetch Bing search results
    const bingResults = await fetchBingResults(searchInput, aiToggle);

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

async function fetchGoogleResults(query, aiToggle) {
    const baseGoogleUrl = "https://www.google.com/search";
    const params = new URLSearchParams({
        q: query,
        tbm: aiToggle ? "isch" : "", // AI-powered image search if enabled
    });

    try {
        const response = await fetch(`${baseGoogleUrl}?${params}`);
        const html = await response.text();

        // Parse the HTML using DOM manipulation (e.g., with Cheerio or DOMParser)
        // Extract relevant data (titles, URLs, etc.) from the search results
        // Return the results as an array
        // Example: const googleResults = extractGoogleResults(html);
        // ...

        // For demonstration purposes, let's return a placeholder result
        return ["Google result 1", "Google result 2"];
    } catch (error) {
        console.error("Error fetching Google results:", error);
        return []; // Return an empty array in case of an error
    }
}

async function fetchBingResults(query, aiToggle) {
    const baseBingUrl = "https://www.bing.com/search";
    const params = new URLSearchParams({
        q: query,
        qft: aiToggle ? "+filterui:imagesize-medium" : "", // AI-powered image search if enabled
    });

    try {
        const response = await fetch(`${baseBingUrl}?${params}`);
        const html = await response.text();

        // Parse the HTML and extract relevant data (titles, URLs, etc.)
        // Example: const bingResults = extractBingResults(html);
        // ...

        // For demonstration purposes, let's return a placeholder result
        return ["Bing result 1", "Bing result 2"];
    } catch (error) {
        console.error("Error fetching Bing results:", error);
        return []; // Return an empty array in case of an error
    }
}
