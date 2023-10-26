const Data = {
    title: [
        titleShakespeare,
        titleCatulo,
        titleMMoore,
        titleCummings,
        titleZeami
    ],
    subtitle: [
        subtitleShakespeare,
        subtitleCatulo,
        undefined,
        subtitleCummings,
        undefined
    ],
    text: [
        textShakespeare,
        textCatulo,
        textMMoore,
        textCummings,
        textZeami
    ]
}

const Trans = {
    cont: document.getElementById("content_container"),
    trans_cont: [],
    trans_obj: []
}

const TransF = {};

TransF.setCont = () => {
    Data.text.forEach((e, i) => {
        Trans.trans_cont.push(document.createElement("div"));
        Trans.trans_cont[i].className = "translation_container";
        if (i == Data.text.length - 1) Trans.trans_cont[i].id = "last_translation_container";
        Trans.cont.appendChild(Trans.trans_cont[i]);
        Trans.trans_obj.push(new SetTranslation(Trans.trans_cont[i], Data.title[i], Data.subtitle[i], Data.text[i]));
    });
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetTranslation {
    constructor(cont, title, subtitle, text) {
        this.Elt = {
            title: [],
            title_line: [],
            scene: [],
            subtitle: [],
            item: [],
            line: [],
            text: []
        }
        this.Key_f = {
            line_height: [{ lineHeight: "0" }, { lineHeight: "1.2" }],
            margin: [{ margin: "0 0 0 0" }, { margin: "var(--txt_margin) 0 var(--txt_margin) 0" }],
            height: [{ height: "0" }, { height: "var(--txt_margin)" }],
            opacity: [{ opacity: "0" }, { opacity: "1", offset: 0.02 }, { opacity: "1" }]
        }
        this.Opt = {
            duration: 1500,
            fill: "forwards",
            easing: "ease-in-out",
            direction: "normal"
        }
        this.isOpen = false;
        this.setTitle(cont, title, subtitle, text);
        this.setClick();
    }

    setTitle = (cont, title, subtitle, text) => {
        this.Elt.title.push(document.createElement("div"));
        this.Elt.title.at(-1).className = "title";
        for (this.i = 0; this.i < 100; this.i++) this.Elt.title.at(-1).innerHTML += title;
        cont.appendChild(this.Elt.title.at(-1));
        for (this.j = 0; this.j < 2; this.j++) {
            this.Elt.title_line.push(document.createElement("div"));
            this.Elt.title_line.at(-1).className = "title_line";
        }
        cont.appendChild(this.Elt.title_line[0]);
        this.setScene(cont, subtitle, text);
        cont.appendChild(this.Elt.title_line[1]);
        this.Elt.title.push(document.createElement("div"));
        this.Elt.title.at(-1).className = "title";
        for (this.i = 0; this.i < 100; this.i++) this.Elt.title.at(-1).innerHTML += title;
        cont.appendChild(this.Elt.title.at(-1));
    }

    setScene = (cont, subtitle, txt) => {
        this.scene_idx = 0;
        this.txt_idx = 0;
        txt.forEach((e, i) => {
            if (e.length > 2) {
                this.Elt.scene.push(document.createElement("div"));
                this.Elt.scene[this.scene_idx].className = "scene";
                this.Elt.scene[this.scene_idx].innerHTML = txt[i];
                cont.appendChild(this.Elt.scene[this.scene_idx]);
                this.scene_idx++;
            } else {
                this.setText(this.txt_idx, cont, subtitle, e);
                this.txt_idx++;
            }
        });
    }

    setText = (idx, cont, subtitle, text) => {
        this.Elt.item.push(document.createElement("div"));
        this.Elt.item[idx].className = "item";
        this.text = [];
        this.text.push(document.createElement("div"));
        this.text[0].className = "text";
        this.text[0].innerHTML = text[0];
        this.text.push(document.createElement("div"));
        this.text[1].className = "text";
        this.text[1].innerHTML = text[1];
        if (subtitle == undefined) {
            cont.appendChild(this.Elt.item[idx]);
            this.Elt.item[idx].appendChild(this.text[0]);
            this.Elt.item[idx].appendChild(this.text[1]);
            this.Elt.text.push(this.text);
        } else {
            this.Elt.subtitle.push(document.createElement("div"));
            this.Elt.subtitle[idx].className = "subtitle";
            this.Elt.subtitle[idx].innerHTML = subtitle[idx];
            cont.appendChild(this.Elt.subtitle[idx]);
            this.Elt.subtitle[idx].appendChild(this.Elt.item[idx]);
            this.lines = [];
            this.lines.push(document.createElement("div"));
            this.lines[0].className = "subtitle_line";
            this.Elt.item[idx].appendChild(this.lines[0]);
            this.Elt.item[idx].appendChild(this.text[0]);
            this.Elt.item[idx].appendChild(this.text[1]);
            this.Elt.text.push(this.text);
            this.lines.push(document.createElement("div"));
            this.lines[1].className = "subtitle_line";
            this.Elt.item[idx].appendChild(this.lines[1]);
            this.Elt.line.push(this.lines);
        }
    }

    setClick = () => {
        this.Elt.title.forEach(e => {
            e.onpointerup = () => { this.runTitleAnim() };
        });
        this.Elt.title_line.forEach(e => {
            e.onpointerdown = () => { this.runTitleAnim() };
        });
        if (this.Elt.subtitle.length > 0) {
            this.Elt.subtitle.forEach((e, i) => {
                e.onpointerdown = () => { this.runTextAnim(i) };
            });
        } else {
            this.Elt.item.forEach((e, i) => {
                e.onpointerdown = () => { this.runTextAnim(i) };
            });
        }
    }

    runTitleAnim = () => {
        if (this.isOpen) {
            this.Opt.direction = "reverse";
            this.Elt.subtitle.forEach(e => e.style.pointerEvents = "none");
            this.Elt.text.forEach((e) => {
                e.forEach((f) => f.style.pointerEvents = "none");
            });
        } else {
            this.Opt.direction = "normal";
            this.Elt.subtitle.forEach(e => e.style.pointerEvents = "all");
            this.Elt.text.forEach((e) => {
                e.forEach((f) => f.style.pointerEvents = "all");
            });
        }
        this.isOpen = !this.isOpen;
        if (this.Elt.scene.length > 0) {
            this.Elt.scene.forEach(e => {
                e.animate(this.Key_f.line_height, this.Opt);
                e.animate(this.Key_f.margin, this.Opt);
            });
        }
        if (this.Elt.subtitle.length > 0) {
            this.Elt.subtitle.forEach((e) => {
                e.animate(this.Key_f.line_height, this.Opt);
                e.animate(this.Key_f.margin, this.Opt);
            });
        } else {
            this.runTextAnim(0);
        }
        if (this.Elt.line.length > 0) {
            this.Elt.line.forEach((e) => {
                e.forEach((f) => {
                    f.animate(this.Key_f.height, this.Opt);
                });
            });
        }
        this.Elt.text.forEach(e => {
            this.st = window.getComputedStyle(e[0]);
            this.line_h = this.st.getPropertyValue("line-height");
            if (this.line_h != "0px") {
                e.forEach(f => {
                    f.animate(this.Key_f.line_height, this.Opt);
                    f.animate(this.Key_f.margin, this.Opt);
                    f.animate(this.Key_f.opacity, this.Opt);
                });                
            }
        });
    }

    runTextAnim = (idx) => {
        this.st = window.getComputedStyle(this.Elt.text[idx][0]);
        this.line_h = this.st.getPropertyValue("line-height");
        if (this.line_h == "0px") {
            this.Opt.direction = "normal";
            this.Elt.text[idx].forEach((e) => e.style.pointerEvents = "all");
        } else {
            this.Opt.direction = "reverse";
            this.Elt.text[idx].forEach((e) => e.style.pointerEvents = "none");
        }
        this.Elt.text[idx].forEach((e) => {
            e.animate(this.Key_f.line_height, this.Opt);
            e.animate(this.Key_f.margin, this.Opt);
            e.animate(this.Key_f.opacity, this.Opt);
        });
    }
}

TransF.setCont();