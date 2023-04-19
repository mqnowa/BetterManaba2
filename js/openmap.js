function getURL(path) {
    const USERNAME = "4vent";
    const REPO = "BetterManaba2";
    if (typeof(chrome) != "undefined" && typeof(chrome.runtime) != "undefined") {
        return chrome.runtime.getURL(path);
    } else {
        return "https://" + USERNAME + ".github.io/" + REPO + "/" + path
    }
}

export async function main() {
    const RM = await import(getURL("js/rightmenue.js"));
    RM.add_rightmenu_block("view-map-box", "教室までの道のりを Google Map で表示",
        
    )
}