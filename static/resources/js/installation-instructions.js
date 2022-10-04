// Main code
$(document).ready(() => {
    fetch("static/resources/md/windows-installation-instructions.md")
        .then(response => response.text())
        .then(text => {
            // Parse as markdown
            let converter = new showdown.Converter();
            let bodyHTML = converter.makeHtml(text);
            $("#windows-installation-instructions").html(bodyHTML);
        });

    fetch("static/resources/md/macos-installation-instructions.md")
        .then(response => response.text())
        .then(text => {
            // Parse as markdown
            let bodyHTML = CONVERTER.makeHtml(text);
            $("#macos-installation-instructions").html(bodyHTML);
        });
});
