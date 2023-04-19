function getURL(path) {
    const USERNAME = "4vent";
    const REPO = "BetterManaba2";
    if (typeof(chrome) != "undefined" && typeof(chrome.runtime) != "undefined") {
        return chrome.runtime.getURL(path);
    } else {
        return "https://" + USERNAME + ".github.io/" + REPO + "/" + path
    }
}

async function main() {
    const unuseroom = await import(getURL("js/unuseroom.js"));
    const openmap = await import(getURL("js/openmap.js"));
    unuseroom.main();
    // openmap.main();
}

main();