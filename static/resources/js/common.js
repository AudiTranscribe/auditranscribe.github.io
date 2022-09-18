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
        assets.forEach((asset) => {
            artifactsHTML += `<li><a href=${asset["browser_download_url"]}>${asset["name"]}</a></li>`;
        });
        artifactsHTML += "</ul>";
    } else {
        artifactsHTML = "<span>None available.</span>"
    }

    return artifactsHTML;
}
