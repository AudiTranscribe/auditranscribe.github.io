// Select elements
let releaseContainer = $("#releases-container");

// Helper functions
function zeroPad(string, numZeros) {
    return String(string).padStart(numZeros, "0");
}

function padDateInfo(dateInfo) {
    return zeroPad(dateInfo, 2);
}

// Main code
$(document).ready(() => {
    // Get releases' info from GitHub
    $.get("https://api.github.com/repos/AudiTranscribe/AudiTranscribe/releases", (releases) => {
        // Process each separate release
        releases.forEach((release) => {
            // Get needed release information
            let url = release["html_url"];
            let releaseTimestamp = release["published_at"];
            let name = release["name"];
            let body = release["body"];
            let assets = release["assets"];

            // Parse release time
            let releaseDate = new Date(Date.parse(releaseTimestamp));
            let localUTCOffset = (-releaseDate.getTimezoneOffset()) / 60;  // In hours
            let localUTCOffsetSign = localUTCOffset >= 0 ? "+" : "-";

            // Format it for presentation
            let releaseYear = releaseDate.getFullYear();
            let releaseMonth = padDateInfo(releaseDate.getMonth());
            let releaseDay = padDateInfo(releaseDate.getDate());
            let releaseHour = padDateInfo(releaseDate.getHours());
            let releaseMinute = padDateInfo(releaseDate.getMinutes());

            let publishedAt = `${releaseYear}-${releaseMonth}-${releaseDay}, ${releaseHour}:${releaseMinute} (UTC${localUTCOffsetSign}${localUTCOffset})`;

            // Parse the body as markdown
            let converter = new showdown.Converter();
            let bodyHTML = converter.makeHtml(body);

            // Form release artifacts HTML code
            let artifactsHTML = ""

            if (assets.length != 0) {
                artifactsHTML += "<ul>";
                assets.forEach((asset) => {
                    artifactsHTML += `<li><a href=${asset["browser_download_url"]}>${asset["name"]}</a></li>`;
                });
                artifactsHTML += "</ul>";
            } else {
                artifactsHTML = "<span>None available.</span>"
            }

            // Append HTML
            releaseContainer.append(`<div class="row card">
            <h2>${name}</h2>
            <h4>${publishedAt}</h4>
            <div>
            ${bodyHTML}
            </div>
            <hr>
            <div>
                <span>Release Artifacts:</span>
                ${artifactsHTML}
            </div>
            <hr>
            <span style="font-size: 11pt">The original release post can be found <a href=${url}>here</a>.</span>
        </div>`);
        });
    });
});
