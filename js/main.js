function getURL(path) {
    const USERNAME = "mqnowa";
    const REPO = "BetterManaba2";
    if (typeof(chrome) != "undefined" && typeof(chrome.runtime) != "undefined") {
        return chrome.runtime.getURL(path);
    } else {
        return "https://" + USERNAME + ".github.io/" + REPO + "/" + path
    }
}

async function main() {
    const unuseroom = await import(getURL("js/unuseroom.js"));
    const deadline = await import(getURL("js/deadline.js"));
    const openmap = await import(getURL("js/openmap.js"));
    unuseroom.main();
    deadline.main();
    openmap.main();
}

main();