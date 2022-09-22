// Select elements
let releaseTagElem = $("#release-tag");
let downloadLinkElem = $("#download-link");

// Main code
$(document).ready(() => {
    // Get page arguments
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop.toString()),
    });

    // Get requested release info
    let releaseTag = params["tag"];
    let platform = params["platform"];

    // Download file
    let downloadURL = `https://github.com/AudiTranscribe/AudiTranscribe/releases/download/${releaseTag}/${platform}-Installer.zip`;
    downloadLinkElem.attr("href", downloadURL);

    downloadLinkElem.click((e) => {
        e.preventDefault();
        window.location.href = downloadURL;
    });

    downloadLinkElem.click();

    // Update heading
    releaseTagElem.html(releaseTag);
});
