/**
 * 
 * @param {[HTMLElement]} contents 
 */
export function add_rightmenu_block(contents) {
    const right_body = document.querySelector(".contentbody-right");

    const div = Object.assign(document.createElement("div"), {
        className:  "my-infolist my-infolist-searchall"
    });
    const infolist_header = Object.assign(document.createElement("div"), {
        className:  "my-infolist-header"
    });
    const header = Object.assign(document.createElement("h2"), {
        textContent: "text"
    });
    const infolist_body = Object.assign(document.createElement("div"), {
        className:  "my-infolist-body"
    });
    const content = Object.assign(document.createElement("div"), {
        style: "padding: 10px; text-align: right;"
    });

    contents.forEach(c => {
        content.appendChild(c)
    })

    infolist_header.appendChild(header);
    div.appendChild(infolist_header);
    infolist_body.appendChild(content);
    div.appendChild(infolist_body);

    right_body.insertBefore(div, right_body.childNodes[0]);
}