// Common constants
const CONVERTER = new showdown.Converter({strikethrough: true});
CONVERTER.setFlavor("github");

// Common functions
function getPublishedAtString(releaseDate) {
    let localUTCOffset = (-releaseDate.getTimezoneOffset()) / 60;  // In hours
    let localUTCOffsetSign = localUTCOffset >= 0 ? "+" : "-";

    let releaseYear = releaseDate.getFullYear();
    let releaseMonth = padDateInfo(releaseDate.getMonth() + 1);  // Because month 0 = January
    let releaseDay = padDateInfo(releaseDate.getDate());
    let releaseHour = padDateInfo(releaseDate.getHours());
    let releaseMinute = padDateInfo(releaseDate.getMinutes());

    return `${releaseYear}-${releaseMonth}-${releaseDay}, ${releaseHour}:${releaseMinute} ` +
        `(UTC${localUTCOffsetSign}${localUTCOffset})`;
}

function generateArtifactsHTML(assets) {
    let artifactsHTML = ""

    if (assets.length !== 0) {
        artifactsHTML += "<ul>";
        for (let i = 0; i < assets.length; i++) {
            // Get the asset
            let asset = assets[i];

            // Get the platform name and tag from the asset
            let platformName = asset["name"].split("-")[0];

            let urlSplit = asset["browser_download_url"].split("/");
            let tag = urlSplit[urlSplit.length - 2];

            // Add to the artifactsHTML
            artifactsHTML += `<li><a href="/download?platform=${platformName}&tag=${tag}">${asset["name"]}</a></li>`;
        }
        artifactsHTML += "</ul>";
    } else {
        artifactsHTML = "<span>None available.</span>"
    }

    return artifactsHTML;
}
