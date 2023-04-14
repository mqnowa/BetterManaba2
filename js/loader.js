// (async() => {
//     const src = chrome.runtime.getURL("js/unuseroom.js");
//     const contentMain = await import(src);
// })()

async function main() {
    const src = chrome.runtime.getURL("js/unuseroom.js");
    const contentMain = await import(src);
}
main();