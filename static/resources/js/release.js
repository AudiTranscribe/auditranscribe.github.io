// Select elements
let releaseNameElem = $("#release-name");
let releaseDateElem = $("#release-date");
let releaseInfoElem = $("#release-info");

// Helper functions
function zeroPad(string, numZeros) {
    return String(string).padStart(numZeros, "0");
}

function padDateInfo(dateInfo) {
    return zeroPad(dateInfo, 2);
}

// Main code
$(document).ready(() => {
    // Get page arguments
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop.toString()),
    });

    // Get requested release info
    let releaseTag = params["tag"];

    // Get release's info from GitHub
    $.get("https://api.github.com/repos/AudiTranscribe/AudiTranscribe/releases/tags/" + releaseTag, (release) => {
        // Get needed release information
        let url = release["html_url"];
        let releaseTimestamp = release["published_at"];
        let name = release["name"];
        let body = release["body"];
        let assets = release["assets"];

        // Update document title to the release name
        document.title = "AudiTranscribe - " + name;

        // Parse release time
        let releaseDate = new Date(Date.parse(releaseTimestamp));
        let publishedAt = getPublishedAtString(releaseDate);

        // Update hero box info
        releaseNameElem.html(name);
        releaseDateElem.html(publishedAt);

        // Parse the body as markdown
        let bodyHTML = CONVERTER.makeHtml(body);

        // Form release artifacts HTML code
        let artifactsHTML = generateArtifactsHTML(assets);

        // Append HTML
        releaseInfoElem.append(`<div class="row card">
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
    }).fail((ignored1, ignored2, ignored3) => {
        releaseNameElem.html("Unable To Find Specified Release");
        releaseInfoElem.append(`<div class="row card">Can't find specified release.</div>`);
    });
});
