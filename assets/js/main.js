function search() {
    const searchInput = document.getElementById("searchInput").value;
    const searchResults = document.getElementById("searchResults");

    // Google Search
    const googleIframe = document.createElement("iframe");
    googleIframe.src = `https://www.google.com/search?q=${encodeURIComponent(searchInput)}`;
    googleIframe.style.width = "100%";
    googleIframe.style.height = "400px";
    searchResults.appendChild(googleIframe);

    // Bing Search
    const bingIframe = document.createElement("iframe");
    bingIframe.src = `https://www.bing.com/search?q=${encodeURIComponent(searchInput)}`;
    bingIframe.style.width = "100%";
    bingIframe.style.height = "400px";
    searchResults.appendChild(bingIframe);
}
