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
        get: (searchParams, prop) => searchParams.get(prop),
    });
    
    // Get requested release info
    let releaseTag = params.tag;

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
        let localUTCOffset = (-releaseDate.getTimezoneOffset()) / 60;  // In hours
        let localUTCOffsetSign = localUTCOffset >= 0 ? "+" : "-";

        // Format it for presentation
        let releaseYear = releaseDate.getFullYear();
        let releaseMonth = padDateInfo(releaseDate.getMonth());
        let releaseDay = padDateInfo(releaseDate.getDate());
        let releaseHour = padDateInfo(releaseDate.getHours());
        let releaseMinute = padDateInfo(releaseDate.getMinutes());

        let publishedAt = `${releaseYear}-${releaseMonth}-${releaseDay}, ${releaseHour}:${releaseMinute} (UTC${localUTCOffsetSign}${localUTCOffset})`;

        // Update hero box info
        releaseNameElem.html(name);
        releaseDateElem.html(publishedAt);

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
    }).fail((jqXHR, textStatus, errorThrown) => {
        releaseNameElem.html("Unable To Find Specified Release");
        releaseInfoElem.append(`<div class="row card">Can't find specified release.</div>`);
    });
});
