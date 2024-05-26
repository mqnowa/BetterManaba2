function getURL(path) {
    const USERNAME = "mqnowa";
    const REPO = "BetterManaba2";
    if (typeof(chrome) != "undefined" && typeof(chrome.runtime) != "undefined") {
        return chrome.runtime.getURL(path);
    } else {
        return "https://" + USERNAME + ".github.io/" + REPO + "/" + path
    }
}

// ===== GET CLASROOMS in https://www.ritsumei.ac.jp/rainbow/avlist-class-bkc/ =====
// var a = "";
// console.log([...document.querySelectorAll("#DataTables_Table_0 tr > td:nth-child(3)")].map(td => td.textContent).join("\n"));
// console.log(a);

const HOST = "https://mqnowa.github.io/"
const PROJECT = "BetterManaba2/"


const roomPrefix = {
    ad: {
        1: "アドセミナリオ",
        2: "アドセミナリオ",
        3: "アドセミナリオ",
        4: "アドセミナリオ",
    },
    co: {
        1: "コラーニングⅠ　",
        2: "コラーニングⅠ　",
        3: "コラーニングⅠ　",
        4: "コラーニングⅠ　",
        5: "コラーニングⅡ　",
        6: "コラーニングⅡ　",
        7: "コラーニングⅡ　",
        8: "コラーニングⅡ　",
    },
    cc: {
        1: "クリエーションコア CC"
    },
    pr: {
        1: "プリズムハウス",
        2: "プリズムハウス",
    },
    fr: {
        1: "フォレストハウス",
        2: "フォレストハウス",
        3: "フォレストハウス",
    },
    ra: {
        1: "ラルカディア　",
        2: "ラルカディア　",
        3: "ラルカディア　",
        4: "ラルカディア　",
    }
};

const availableRooms = {
    "アドセミナリオ": {
        1: [],
        2: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214],
        3: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314],
        4: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414],
    },
    "コラーニングⅠ　": {
        1: [101, 102, 103, 104, 105, 106, 107, 108, 109],
        2: [201, 202, 203, 204, 205, 206],
        3: [301, 302, 303, 304, 305, 306],
        4: [401, 402, 403],
    },
    "コラーニングⅡ　": {
        5: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510],
        6: [601, 602, 603, 604, 605, 606, 607],
        7: [701],
        8: [801],
    },
    "クリエーションコア CC": {
        1: [101]
    },
    "プリズムハウス": {
        1: [105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
        2: [201],
    },
    "フォレストハウス": {
        1: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
        2: [201, 202, 203, 204, 205, 206],
        3: [301, 302, 303, 304, 305, 306],
    },
    "ラルカディア　": {
        1: [101, 102, 103],
        2: [201, 202],
        3: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315],
        4: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415],
    }
}

const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SM = {"": "すべて", 0: "通年", 1: "春学期", 2: "秋楽器", 3: "夏集中", 4: "冬集中"};

class Unuseroom {
    constructor(manaba_xhr_csrf_token) {
        this.manaba_xhr_csrf_token = manaba_xhr_csrf_token;
    }

    async main() {
        const RM = await import(getURL("js/rightmenue.js"));

        const options = {
            campusBuilding: "ad",
            level: 1,
            year: undefined,
            semester: undefined,
            weekday: undefined,
            period: undefined
        }

        const button = Object.assign(document.createElement("input"), {
            type: "button",
            value: "探す",
            style: "margin: 0;"
        })
        RM.add_rightmenu_block("search-rooms-box", "空き教室検索", "right", [
            RM.makeinput((ev) => { 
                if (ev.target.value == "") options.year = undefined;
                else options.year = ev.target.value;
            }, "年度：", new Date().getFullYear().toString()),
            RM.makedropdown((ev) => { 
                if (ev.target.value == "null") options.semester = undefined;
                else options.semester = Math.floor(Number(ev.target.value));
            }, "学期：", [["今", "null"], ["春学期", "1"], ["秋学期", "2"]]),
            RM.makedropdown((ev) => { 
                if (ev.target.value == "null") options.weekday = undefined;
                else options.weekday = ev.target.value;
            }, "曜日：", [["今", "null"], ["月", "Mon"], ["火", "Tue"], ["水", "Wed"], ["木", "Thu"], ["金", "Fri"]]),
            RM.makedropdown((ev) => { 
                if (ev.target.value == "null") options.period = undefined;
                else options.period = Math.floor(Number(ev.target.value));
            }, "時限：", [["今", "null"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]]),
            RM.makedropdown((ev) => { 
                if (ev.target.value == "null") options.campusBuilding = undefined;
                else options.campusBuilding = ev.target.value;
            }, "場所：", [["アドセミナリオ", "ad"], ["コラーニングⅠ・Ⅱ", "co"], ["クリエーションコア", "cc"], ["プリズムハウス", "pr"], ["フォレストハウス", "fr"], ["ラルカディア", "ra"]]),
            RM.makeinput((ev) => { 
                if (ev.target.value == "") options.level = undefined;
                else options.level = Math.floor(Number(ev.target.value));
            }, "　階：", "1"),
            button
        ]);
        button.addEventListener("click", async ev => {
            const search_rooms_box = document.querySelector("#search-rooms-box");
            var search_rooms_result = search_rooms_box.querySelector("#search-rooms-result");
            if (search_rooms_box.querySelector("#search-rooms-result")) {
                search_rooms_result.textContent = "お待ちください…"
            } else {
                search_rooms_result = Object.assign(document.createElement("div"), {
                    id: "search-rooms-result",
                    textContent: "お待ちください…"
                })
                search_rooms_box.appendChild(search_rooms_result);
            }
            button.disabled = true;
            const res = await getUsableRooms(
                this.manaba_xhr_csrf_token,
                options.campusBuilding,
                options.level, 
                options.year, 
                options.semester, 
                options.weekday, 
                options.period,
                search_rooms_result
            );
            
            if (res.usableRooms.length == 0) {
                search_rooms_result.textContent = "空き教室はありません。";
            } else {
                search_rooms_result.textContent = "空き教室は " + res.usableRooms.toString() + " です。";
            }

            var i = 5;
            const interval = setInterval(() => {
                if (i == 0) {
                    button.disabled = false;
                    button.value = "検索";
                    clearInterval(interval);
                } else {
                    button.value = i.toString();
                    i -= 1;
                }
            }, 1000);
        });
    }
}


/**
 * 
 * @param {*} manaba_xhr_csrf_token
 * @param {String} campusBuilding ad, co, cc, pr, fr, ra
 * @param {Number} level 階
 * @param {Number} year 年
 * @param {Number} semester "": すべて, 0: 通年, 1: 春学期, 2: 秋楽器, 3: 夏集中, 4: 冬集中
 * @param {String} weekday 曜日 Mon Tue Wed Thu Fri Sat Sun
 * @param {Number} period 時限 1 2 3 4 5 6 7 8 9
 */
async function getUsableRooms(manaba_xhr_csrf_token, campusBuilding, level, year, semester, weekday, period, message_element) {
    const date = new Date();
    date.setTime(date.getTime() + 1000*60*60*9);

    if (!level) level = 1
    if (!year) year = date.getUTCFullYear();
    if (!semester) semester = (1 < date.getUTCMonth() && date.getUTCMonth() < 7) ? 1 : 2;
    if (!weekday) weekday = WD[date.getUTCDay()];
    if (!period) {
        const day_minute = date.getTime() % (1000 * 60 * 60 * 24) / 60000;
        if (1180 < day_minute) period = 7;
        else if (1080 < day_minute) period = 6;
        else if (980 < day_minute) period = 5;
        else if (880 < day_minute) period = 4;
        else if (780 < day_minute) period = 3;
        else if (640 < day_minute) period = 2;
        else period = 1;
    }
    const prefix = roomPrefix[campusBuilding][level];
    const payload = {
        search: prefix + hw2fw(level.toString()),
        prevsearch: prefix + hw2fw(level.toString()),
        pagelen: 50,
        detail: "",
        org: "",
        year: year,
        termgroup: semester,
        "manaba-form": "1",
        SessionValue1: manaba_xhr_csrf_token,
        SessionValue: "@1",
    };
    payload["period[" + weekday + "][" + period.toString() + "]"] = "✓";

    const options = {
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "ja,en-US;q=0.9,en;q=0.8",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": '"Chromium";v="108", "Not?A_Brand";v="8"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
        },
        referrer: "https://ct.ritsumei.ac.jp/ct/syllabus__search",
        referrerPolicy: "strict-origin-when-cross-origin",
        mode: "cors",
        credentials: "include",
    };

    // シラバス検索結果を取得
    const htmlText = await (
        await fetch("https://ct.ritsumei.ac.jp/ct/syllabus__search", {
            method: "POST",
            body: new URLSearchParams(payload).toString(),
            ...options
        })
    ).text();
    const doc = new DOMParser().parseFromString(htmlText, "text/html");

    // 授業リストから授業教室を取得
    const classes = doc.querySelectorAll("#syllabussearchform .stdlist tr:not(.title)");
    const usedRooms = [];
    for (var i = 0; i < classes.length; i++) {
        if (typeof(message_element) != "undefined") message_element.textContent = "お待ちください...(" + (i+1).toString() + "/" + classes.length.toString() + ")";
        const id = classes[i].getAttribute("onclick").match(/'href':'(syllabus_[0-9]+)'/)[1];
        const htmlText = await (await fetch("https://ct.ritsumei.ac.jp/ct/" + id)).text();
        const doc = new DOMParser().parseFromString(htmlText, "text/html");
        const classroomMatch = doc.querySelector("div.articlebody > div:nth-child(5)").textContent.match(/([0-9０-９]+)号教室/);
        if (classroomMatch) {
            if (isNaN(classroomMatch[1])) usedRooms.push(Number(fw2hw(classroomMatch[1])));
            else usedRooms.push(Number(classroomMatch[1]));
        }
    };

    // 教室リストの中で、授業リスト中の教室にないものを抽出
    // const usableRooms = [];
    // availableRooms[campusBuilding][level].forEach(room => {
    //     if (!usedRooms.includes(room)) {
    //         usableRooms.push(room);
    //     }
    // });
    const usableRooms = availableRooms[prefix][level].filter(
        room => !usedRooms.includes(room)
    );

    return ({
        usableRooms: usableRooms,
        campusBuilding: prefix,
        level: level,
        year: year,
        semester: semester,
        weekday: weekday,
        period: period
    });
}

/**
 * full-width to half-width
 * @param {str} str 
 * @returns 
 */
function fw2hw(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

/**
 * half-width to full-width
 * @param {str} str 
 * @returns 
 */
function hw2fw(str) {
    return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}

export function main() {
    const text = document.querySelectorAll("head > script")[2].textContent;
    const xhr_csrf_token = text.match(/manaba\.xhr_csrf_token = "([^"]+)/)[1];
    console.log(xhr_csrf_token);
    new Unuseroom(xhr_csrf_token).main();
}
