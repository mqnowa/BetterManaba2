function main() {
    const querystatus = document.querySelector(".querystatus").cloneNode(true);
    querystatus.style.padding = "4px 4px 4px 4px"
    const table = document.createElement("table");
    table.classList.add("queryframe", "queryshow");
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.zIndex = "1";
    div.style.width = "22em";
    div.style.right = "0";
    div.style.bottom = "0";
    
    table.appendChild(querystatus);
    div.appendChild(table);
    document.body.insertBefore(div, document.body.firstChild);
    const myQuerySpentSecClock = querystatus.querySelector("#webat-QuerySpentSecClock").parentElement;
    myQuerySpentSecClock.innerHTML = "";
    const querySpentSecClock = document.querySelector("#webat-QuerySpentSecClock");
    myQuerySpentSecClock.textContent = querySpentSecClock.textContent;

    const callback = (mutationsList, observer) => {
        myQuerySpentSecClock.textContent = querySpentSecClock.textContent;
    }
    const observer = new MutationObserver(callback);
    observer.observe(querySpentSecClock,
                     {attributes: true, childList: true, subtree: true});
}
main();

document.addEventListener("DOMContentLoaded", () => {
    main();
});