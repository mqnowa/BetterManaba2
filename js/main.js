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
    if (location.href == ("https://ct.ritsumei.ac.jp/ct/home_course") ||
        location.href == ("https://ct.ritsumei.ac.jp/ct/home")) {
        const unuseroom = await import(getURL("js/unuseroom.js"));
        const deadline = await import(getURL("js/deadline.js"));
        const openmap = await import(getURL("js/openmap.js"));
        unuseroom.main();
        deadline.main();
        openmap.main();
    } else if (location.href.match(/https:\/\/ct\.ritsumei\.ac\.jp\/ct\/course_[0-9]+_(query|survey)_[0-9]+/)) {
        const timeshow = await import(getURL("js/timeshow.js"));
        timeshow.main();
    }
}

main();