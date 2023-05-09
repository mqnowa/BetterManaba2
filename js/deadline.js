const _1SEC = 1000;
const _1MIN = 60 * _1SEC;
const _1HUR = 60 * _1MIN;
const _1DAY = 24 * _1HUR;
const _1MON = 30 * _1DAY;

const EXPIRE_CRISIS =  3 * _1HUR;
const EXPIRE_DANGER = 12 * _1HUR;
const EXPIRE_RISKY  = 1.5 * _1DAY
const EXPIRE_WARN   = 3.5 * _1DAY;
const EXPIRE_INFO   = 7.5 * _1DAY;

/**
 * @param {Number} number 
 * @param {Number} deg 
 */
function zfill(number, deg) {
    var str = number.toString();
    const l = str.length;
    for (var i = 0; i < deg - l; i++) {
        str = "0" + str;
    }
    return str
}

export async function main() {
    const CBLeft = document.querySelector(".contentbody-left");
    const deadLineDiv = makeDeadLineDiv();
    CBLeft.insertBefore(deadLineDiv, CBLeft.childNodes[0]);

    document.head.appendChild(Object.assign(document.createElement("style"), {
        type: "text/css",
        textContent: `
        #deadlinediv a:hover {
            opacity: 0.5;
        }
        #deadlinediv a {
            transition: .3s;
        }
        .bettermanaba-level-crisis {
            background-color: #000000;
            color: #ef857d;
            font-weight: bold;
        }
        .bettermanaba-level-crisis a {
            color: #ef857d;
        }
        .bettermanaba-level-danger {
            background-color: #ee99ff;
            color: #47266e;
            font-weight: bold;
        }
        .bettermanaba-level-danger a {
            color: #47266e;
        }
        .bettermanaba-level-risky {
            background-color: #f19ca7;
            color: #6c272d;
            font-weight: bold;
        }
        .bettermanaba-level-risky a {
            color: #6c272d;
        }
        .bettermanaba-level-warn {
            background-color: #ffe9a9;
            color: #866629;
            font-weight: bold;
        }
        .bettermanaba-level-warn a {
            color: #866629;
        }
        .bettermanaba-level-info {
            background-color: #a3e6e6;
            color: #006948;
            font-weight: bold;
        }
        .bettermanaba-level-info a {
            color: #006948;
        }
        .bettermanaba-level-nodeadline {
            background-color: #e6e6e6;
            color: #000000;
        }
        .bettermanaba-level-nodeadline a {
            color: #000000;
        }`
    }))
}

function makeDeadLineDiv() {
    const div = Object.assign(document.createElement("div"), {
        id: "deadlinediv"
    });
    const infoList = Object.assign(document.createElement("div"), {
        className: "my-infolist my-infolist-coursenews"
    });
    const DLBody = Object.assign(document.createElement("div"), {
        className: "deadline-body",
        style: "margin-top: 5px;"
    });
    const Message = Object.assign(document.createElement("div"), {
        style: "text-align: center; transition: 0.5s; opacity: 1",
        textContent: "読み込み中…"
    });
    const msg_itv_id = setInterval(() => {
        if (Message.style.opacity == 1) Message.style.opacity = 0.2;
        else Message.style.opacity = 1;
        if (Message.hidden == true) {
            clearInterval(msg_itv_id);
        }
    }, 500);
    DLBody.hidden = true;
    const table = Object.assign(document.createElement("table"), {
        className: "stdlist courselist"
    });
    const tbody = Object.assign(document.createElement("tbody"), {});
    table.appendChild(tbody);
    DLBody.appendChild(table);
    infoList.appendChild(DLBody);
    infoList.appendChild(Message);
    div.appendChild(infoList);

    const header = Object.assign(document.createElement("div"), {
        className: "my-infolist-header"
    });
    const h2 = Object.assign(document.createElement("h2"), {
        textContent: "提出物一覧"
    });
    header.appendChild(h2);
    infoList.insertBefore(header, DLBody);

    var row = newRow(null, "残り時間", "課題名", "クラス", true);
    
    tbody.appendChild(row);

    (async () => {
        const queryAssignments = await getAssignments("home_summary_query");
        const surveyAssignments = await getAssignments("home_summary_survey");
        const reportAssignments = await getAssignments("home_summary_report");
        const allAssignments = queryAssignments.concat(surveyAssignments).concat(reportAssignments).sort((a, b) => a.deadline - b.deadline);
        if (allAssignments.length == 0) {
            table.hidden = true;
            DLBody.appendChild(Object.assign(document.createElement("div"), {
                innerHTML: '提出課題はありません！🐔<br><a href="steam://">Steamを開く</a> / <a href="com.epicgames.launcher://">EpicGamesを開く</a> / <a href="origin://">Originを開く</a> / <a href="uplay://">Uplayを開く</a>',
                style: "text-align: center;"
            }))
        } else {
            allAssignments.forEach(i => {
                const t = Math.floor((i.deadline - new Date()) / (1000 * 60 * 60)).toString() + "時間";
                var row = newRow(i.cource_id + "_" + i.fullid, t, i.title, i.cource, false, i.deadline);
                tbody.appendChild(row);
            });
        }
        DLBody.hidden = false;
        Message.hidden = true;
    })();

    return div;
}

/**
 * @param {string} classid
 * @param {string} c1
 * @param {string} c2
 * @param {string} c3
 * @param {boolean | undefined} isHeader
 * @param {Date} deadline
 * @returns 
 */
function newRow(classid, c1, c2, c3, isHeader, deadline) {
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
        const [_, clsid, assid] = classid.match(/([0-9]+)_(.+_[0-9]+)/);
        tr.setAttribute("data-classid", classid);
        td1 = Object.assign(document.createElement("td"), {
            class: "deadlineDate",
            style: "text-align: center;",
            textContent: c1,
        });
        td2 = Object.assign(document.createElement("td"), {
            class: "deadlineTitle",
            style: "overflow: hidden; max-width: 0; white-space: nowrap; text-overflow: ellipsis; text-align: center;",
            innerHTML: "<a href=\"https://ct.ritsumei.ac.jp/ct/course_" + clsid + "_" + assid + "\">" + c2 + "</a>",
        });
        td3 = Object.assign(document.createElement("td"), {
            class: "deadlineCourse",
            style: "overflow: hidden; max-width: 0; white-space: nowrap; text-overflow: ellipsis;",
            innerHTML: "<a href=\"https://ct.ritsumei.ac.jp/ct/course_" + clsid + "\">" + c3 + "</a>",
        });
    }

    var expredTxt;
    var _class;

    if (typeof(deadline) != "undefined") {
        tr.setAttribute("data-deadline", deadline);
    }

    const deadlineData = tr.getAttribute("data-deadline");
    var update;
    if (deadlineData) {
        update = () => {
            if (tr.getAttribute("data-deadline") != 9999999999999) {
                const now = new Date();
                const deadline = tr.getAttribute("data-deadline");
                const expredIn = deadline - now;
        
                // date update
                expredTxt = (expredIn < _1DAY)? "残り" + zfill(Math.floor(expredIn / _1HUR) % 24, 2) + ":"
                                                       + zfill(Math.floor(expredIn / _1MIN) % 60, 2) + ":"
                                                       + zfill(Math.floor(expredIn / _1SEC) % 60, 2)       : 
                            (expredIn < EXPIRE_WARN)? String(Math.floor(expredIn / _1DAY) % 30) + "日と"
                                                      + String(Math.floor(expredIn / _1HUR) % 24) + "時間" :
                            (expredIn < _1MON)?       String(Math.floor(expredIn / _1DAY) % 30) + "日後"   :
                                                      String(Math.floor(expredIn / _1MON)) + "ヶ月後";
        
                // color update
                if      (expredIn < EXPIRE_CRISIS) _class = "bettermanaba-level-crisis";
                else if (expredIn < EXPIRE_DANGER) _class = "bettermanaba-level-danger";
                else if (expredIn < EXPIRE_RISKY ) _class = "bettermanaba-level-risky";
                else if (expredIn < EXPIRE_WARN  ) _class = "bettermanaba-level-warn";
                else if (expredIn < EXPIRE_INFO  ) _class = "bettermanaba-level-info";
            } else {
                expredTxt = "期限なし";
                _class = "bettermanaba-level-nodeadline";
            }
            
            const deadlineElem = tr.querySelector("td:nth-child(1)");
            if (deadlineElem.textContent != expredTxt) deadlineElem.textContent = expredTxt;
    
            if (!tr.classList.contains(_class)) {
                ["bettermanaba-level-crisis", "bettermanaba-level-danger", "bettermanaba-level-risky", "bettermanaba-level-warn", "bettermanaba-level-info",]
                    .forEach(c => tr.classList.remove(c));
                tr.classList.add(_class);
            }
        }

        setInterval(update, 1000);
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    if (deadlineData) {
        update();
    }

    return tr;
}

/**
 * 
 * @param {str} endpoint 
 * @returns {Promise<[{title: str, cource: str, deadline: number, fullid: str, id: str, cource_id: str}]>}
 */
async function getAssignments(endpoint) {
    return new Promise(async resolve => {
        const htmltext = await (await fetch("https://ct.ritsumei.ac.jp/ct/" + endpoint)).text();
        const doc = new DOMParser().parseFromString(htmltext, "text/html");
    
        const result = [];
        doc.querySelector("table.stdlist").querySelectorAll("tr:not(.title)").forEach(tr => {
            const [t, c, d] = tr.querySelectorAll("td");
            const match = t.querySelector("a").href.match(/course_([0-9]+)_(.+_([0-9]+))/);

            const title = t.textContent.replaceAll("\t", "").replaceAll("\n", "").trim();
            const cource = c.textContent.replaceAll("\t", "").replaceAll("\n", "").trim();
            var deadline;
            try { deadline = Date.parse(d.textContent.replace(" ", "T") + ":00.000+09:00"); }
            catch { deadline = 9999999999999; }
            const fullid = match[2];
            const id = match[3];
            const cource_id = match[1];
            result.push({title: title, cource: cource, deadline: deadline, fullid: fullid, id: id, cource_id: cource_id})
        });
        resolve(result)
    })
}