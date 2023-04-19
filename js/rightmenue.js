/**
 * 
 * @param {[HTMLElement]} contents 
 */
export function add_rightmenu_block(body_id, headerText, ...contents) {
    const right_body = document.querySelector(".contentbody-right");

    const div = Object.assign(document.createElement("div"), {
        className:  "my-infolist my-infolist-searchall"
    });
    const infolist_header = Object.assign(document.createElement("div"), {
        className:  "my-infolist-header"
    });
    const header = Object.assign(document.createElement("h2"), {
        textContent: headerText
    });
    const infolist_body = Object.assign(document.createElement("div"), {
        className:  "my-infolist-body"
    });
    const content = Object.assign(document.createElement("div"), {
        style: "padding: 10px; text-align: right; display: flex; gap: 0.2em; flex-direction: column;",
        id: body_id
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

export function makedropdown(func, title, ...options) {
    const flexbox = Object.assign(document.createElement("div"), {
        style: "width: 100%; display: flex;"
    });
    flexbox.appendChild(Object.assign(document.createElement("div"), {
        textContent: title
    }));
    const select = Object.assign(document.createElement("select"), {
        style: "flex-grow: 1;"
    });
    flexbox.appendChild(select);
    options.forEach(op => {
        select.appendChild(Object.assign(document.createElement("option"), {
            textContent: op[0],
            value: op[1]
        }))
    });
    select.addEventListener("change", ev => {
        func(ev);
    });
    return flexbox;
};

export function makeinput(func, title, def) {
    const flexbox = Object.assign(document.createElement("div"), {
        style: "width: 100%; display: flex;"
    });
    flexbox.appendChild(Object.assign(document.createElement("div"), {
        textContent: title
    }));
    const input = Object.assign(document.createElement("input"), {
        type: "text",
        style: "flex-grow: 1;",
        placeholder: def
    });
    flexbox.appendChild(input);
    input.addEventListener("change", ev => {
        func(ev);
    });
    return flexbox;
};