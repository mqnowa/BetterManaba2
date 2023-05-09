function getURL(path) {
    const USERNAME = "4vent";
    const REPO = "BetterManaba2";
    if (typeof(chrome) != "undefined" && typeof(chrome.runtime) != "undefined") {
        return chrome.runtime.getURL(path);
    } else {
        return "https://" + USERNAME + ".github.io/" + REPO + "/" + path
    }
}

const buildings = {
    c: {name: "コラーニングハウスI", pos: [34.98002079063978,135.96331268824125]},
    c2: {name: "コラーニングハウスII", pos: [34.979628640204865,135.96296056852913]},
    a: {name: "アドセミナリオ", pos: [34.980904427493726,135.9618212634012]},
    f: {name: "フォレストハウス", pos: [34.980717071654,135.96376058949662]},
    p: {name: "プリズムハウス", pos: [34.981391985410944,135.9633123899614]},
    r: {name: "インテグレーション コア・ラルカディア", pos: [34.98067488109772,135.96119365203788]},
    t: {name: "トリシア", pos: [34.98310300471189,135.9648693135242]},
    cc: {name: "クリエーション　コア", pos: [34.97969980963935,135.9641540069096]},
    exl1: {name: "エクセル１", pos: [34.981081758656345,135.9638409374639]},
    exl2: {name: "エクセル２", pos: [34.98174604527054,135.96492195095144]},
    exl3: {name: "エクセル３", pos: [34.98261927769867,135.9656451642008]},
    acta: {name: "アクトα", pos: [34.98001464905518,135.96510339412384]},
    actu: {name: "アクトμ", pos: [34.97969924887677,135.96133591306003]},
    actb: {name: "アクトβ", pos: [34.97863542907798,135.96278125151105]},
    acts: {name: "アクトσ", pos: [34.97865554572056,135.9625695324662]},
    ac: {name: "アクロスウイング", pos: [34.981318593800815,135.96160423096262]},
    athlete: {name: "アスリートジム", pos: [34.97876301263773,135.96342535430006]},
    ew: {name: "イーストウイング", pos: [34.982548413552344,135.9647967034153]},
    ww: {name: "ウエストウイング", pos: [34.98199420111852,135.96402476575204]},
    epoc: {name: "エポック立命21", pos: [34.981616489170726,135.96073856607921]},
    frontier: {name: "学術フロンティア共同研究センター", pos: [34.98098968550636,135.9649079995459]},
    seacube: {name: "シー・キューブ", pos: [34.98336515246387,135.96266880185775]},
    canopy: {name: "キャノピー", pos: [34.98252636912505,135.9627398581341]},
    corestation: {name: "コアステーション", pos: [34.98233485397148,135.96434780774734]},
    science: {name: "サイエンス　コア", pos: [34.97902640550874,135.96375027390337]},
    cel: {name: "セル", pos: [34.983415378528576,135.9653114255353]},
    arc: {name: "セントラルアーク", pos: [34.981336771077395,135.96300002173243]},
    complex: {name: "テクノコンプレクス", pos: [34.985169089184275,135.96492856176909]},
    fuel: {name: "燃料電池センター", pos: [34.98617350591518,135.96524733682202]},
    bkcgym: {name: "BKCジム", pos: [34.97875208777813,135.96337266771502]},
    disaster: {name: "防災システムリサーチセンター", pos: [34.9855360585605,135.9650230858793]},
    media: {name: "メディアセンター", pos: [34.982490660649056,135.96376790386628]},
    union: {name: "ユニオンスクエア", pos: [34.98199393600249,135.96296992417467]},
    incubator: {name: "立命館大学BKCインキュベータ", pos: [34.9850172516173,135.96455828590626]},
    rohm: {name: "立命館大学ローム記念館", pos: [34.983856892980185,135.9647817359663]},
    link: {name: "リンクスクエア", pos: [34.980118899818734,135.96386820991674]},
    rxl: {name: "レクセル", pos: [34.981378724313736,135.96386820991728]},
    workshop: {name: "ワークショップラボ", pos: [34.98221563925701,135.96531918463452]},
    international: {name: "BKCインターナショナルハウス", pos: [34.97579764750843,135.96280687178745]},
    biolink: {name: "バイオリンク", pos: [34.980371632899114,135.96458774526656]},
    commons: {name: "BKCスポーツ健康コモンズ", pos: [34.98432610258617,135.96171000416734]},
}

export async function main() {
    const RM = await import(getURL("js/rightmenue.js"));
    const button = Object.assign(document.createElement("input"), {type: "button", style: "margin: 0;", value: "GO!"});
    button.addEventListener("click", ev => {
        const match = document.querySelector("#search_map_classroom_input")
            .value.match(/([a-zA-Z]+)([0-9]{3})/);

        var pos = undefined;
        var code = undefined;
        if (match) code = match[1];
        if (match && code.toLowerCase() == "c" && Number(match[2]) >= 500) {
            code = "c2";
        }
        if (match && Object.keys(buildings).includes(code.toLowerCase())) {
            pos = buildings[code.toLowerCase()].pos;
        }
        if (typeof(pos) === "undefined") {
            pos = buildings[document.querySelector("#search_map_classroom_selector").value].pos;
        }
        window.open("https://www.google.com/maps/dir/?api=1&destination=" + pos[0].toString() + "," + pos[1].toString() + "&travelmode=walking&dir_action=navigate");
    })
    RM.add_rightmenu_block("view-map-box", "教室を Google Map で見る", "center", [
        RM.makedropdown(() => {}, "", 
            Object.keys(buildings).map(k => [buildings[k].name, k]),
            "search_map_classroom_selector"
        ),
        Object.assign(document.createElement("div"), {textContent: "or"}),
        RM.makeinput(() => {}, "", "教室番号を入力", "search_map_classroom_input"),
        button,
    ]);
}
