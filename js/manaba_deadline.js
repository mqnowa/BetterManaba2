async function main() {
    const CBLeft = document.querySelector(".contentbody-left");
    const deadLineDiv = makeDeadLineDiv();
    CBLeft.insertBefore(deadLineDiv, CBLeft.childNodes[0]);

    const queryAssignments = await getAssignments("home_summary_query");
    const surveyAssignments = await getAssignments("home_summary_survey");
    const reportAssignments = await getAssignments("home_summary_report");
}

function makeDeadLineDiv() {
    const div = Object.assign(document.createElement("div"), {
        id: "deadlinediv"
    });
    const infoList = Object.assign(document.createElement("div"), {
        className: "my-infolist my-infolist-coursenews"
    });
    const DLBody = Object.assign(document.createElement("div"), {
        className: "deadline-body"
    });
    const table = Object.assign(document.createElement("table"), {
        className: "stdlist courselist"
    });
    const tbody = Object.assign(document.createElement("tbody"), {});
    table.appendChild(tbody);
    DLBody.appendChild(table);
    infoList.appendChild(DLBody);
    div.appendChild(infoList);

    const header = Object.assign(document.createElement("div"), {
        className: "my-infolist-header"
    });
    const h2 = Object.assign(document.createElement("h2"), {
        textContent: "提出物一覧"
    });
    header.appendChild(h2);
    infoList.insertBefore(header, DLBody);

    newRow(tbody, null, "残り時間", "課題名", "クラス", true);
    newRow(tbody, "classid_1", "残り時間", "課題名", "クラス");
    newRow(tbody, "classid_2", "残り時間", "課題名", "クラス");
    newRow(tbody, "classid_3", "残り時間", "課題名", "クラス");

    return div;
}

/**
 * @param {HTMLTableSectionElement} tbody
 * @param {string} classid
 * @param {string} c1
 * @param {string} c2
 * @param {string} c3
 * @param {boolean | undefined} isHeader
 * @returns 
 */
function newRow(tbody, classid, c1, c2, c3, isHeader) {
    const tr = Object.assign(document.createElement("tr"), {
        className: (isHeader) ? "title" : ""
    });
    var td1, td2, td3;
    if (isHeader) {
        td1 = Object.assign(document.createElement("th"), {
            textContent: c1,
            width: "20%"
        });
        td2 = Object.assign(document.createElement("th"), {
            textContent: c2,
            width: "50%"
        });
        td3 = Object.assign(document.createElement("th"), {
            textContent: c3,
            width: "30%"
        });
    } else {
        tr.setAttribute("data-classid", classid);
        td1 = Object.assign(document.createElement("td"), {
            class: "deadlineDate",
            textContent: c1,
        });
        td2 = Object.assign(document.createElement("td"), {
            class: "deadlineTitle",
            textContent: c2,
        });
        td3 = Object.assign(document.createElement("td"), {
            class: "deadlineCourse",
            textContent: c3,
        });
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tbody.appendChild(tr);
}

async function getAssignments(endpoint) {
    const htmltext = await (await fetch("https://ct.ritsumei.ac.jp/ct/" + endpoint)).text();
    const doc = new DOMParser().parseFromString(htmltext, "text/html");
    doc.querySelector("table.stdlist").querySelectorAll("tr:not(.title)").forEach(tr => {
        console.log(tr);
    })
}

main();