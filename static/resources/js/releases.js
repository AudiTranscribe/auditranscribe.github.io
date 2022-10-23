// Select elements
let releaseContainerElem = $("#releases-container");

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
            let tagName = release["tag_name"];
            let name = release["name"];
            let body = treatMarkdownForBody(release["body"]);
            let assets = release["assets"];

            // Parse release time
            let releaseDate = new Date(Date.parse(releaseTimestamp));
            let publishedAt = getPublishedAtString(releaseDate);

            // Parse the body as markdown
            let bodyHTML = CONVERTER.makeHtml(body);

            // Form release artifacts HTML code
            let artifactsHTML = generateArtifactsHTML(assets);

            // Append HTML
            releaseContainerElem.append(
                `<div class="row card">
                    <a href="/release?tag=${tagName}">
                        <h2>${name}</h2>
                        <h4>${publishedAt}</h4>
                    </a>
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
                </div>`
            );
        });
    }).fail((ignored1, ignored2, ignored3) => {
        releaseContainerElem.append(`<div class="row card">Can't find releases.</div>`);
    });
});
