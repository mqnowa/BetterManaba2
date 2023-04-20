/**
 * 
 * @param {string} body_id 
 * @param {string} headerText 
 * @param {string} text_align 
 * @param {HTMLElement} contents 
 */
export function add_rightmenu_block(body_id, headerText, text_align, contents) {
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
        style: `padding: 10px; text-align: ${text_align}; display: flex; gap: 0.2em; flex-direction: column;`,
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

/**
 * 
 * @param {function} func 
 * @param {string} title 
 * @param {[HTMLOptionElement]} options 
 * @returns 
 */
export function makedropdown(func, title, options, _id) {
    const flexbox = Object.assign(document.createElement("div"), {
        style: "width: 100%; display: flex;"
    });
    flexbox.appendChild(Object.assign(document.createElement("div"), {
        textContent: title
    }));
    const select = Object.assign(document.createElement("select"), {
        style: "width: 1px; flex-grow: 1;"
    });
    flexbox.appendChild(select);
    options.forEach(op => {
        const option = Object.assign(document.createElement("option"), {
            textContent: op[0],
            value: op[1]
        });
        if (op.length == 3) {
            Object.keys(op[2]).forEach(k => option.setAttribute(k, (op[2][k] === true) ? "" : op[2][k]));
        }
        select.appendChild(option);
    });
    select.addEventListener("change", ev => {
        func(ev);
    });
    if (typeof(_id) != "undefined") {
        select.id = _id;
    }
    return flexbox;
};

/**
 * 
 * @param {function} func 
 * @param {string} title 
 * @param {string} placeholder 
 * @returns 
 */
export function makeinput(func, title, placeholder, _id) {
    const flexbox = Object.assign(document.createElement("div"), {
        style: "width: 100%; display: flex;"
    });
    flexbox.appendChild(Object.assign(document.createElement("div"), {
        textContent: title
    }));
    const input = Object.assign(document.createElement("input"), {
        type: "text",
        style: "flex-grow: 1;",
        placeholder: placeholder
    });
    flexbox.appendChild(input);
    input.addEventListener("change", ev => {
        func(ev);
    });
    if (typeof(_id) != "undefined") {
        input.id = _id;
    }
    return flexbox;
};