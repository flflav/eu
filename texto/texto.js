const Data = {
    title: [
        titleTerror,
        titleMuybridge
    ],
    subtitle: [
        subtitleTerror,
        undefined
    ],
    text: [
        textTerror
    ]
}

const Text = {
    cont: document.getElementById("content_container"),
    text_cont: [],
    text_obj: []
}

const TextF = {};

TextF.initMuybridge = () => {
    let temp = [];
    let i = 0;
    while (i < textMuybridge.length - 1) {
        temp.push(textMuybridge[i]);
        i++;
    }
    let rand_muy = shuffleArray(temp);
    rand_muy.push(textMuybridge.at(-1));
    Data.text.push(rand_muy);
}

TextF.setCont = () => {
    Data.text.forEach((e, i) => {
        Text.text_cont.push(document.createElement("div"));
        Text.text_cont.at(-1).className = "text_container";
        Text.text_cont.at(-1).id = `container_${i}`;
        Text.cont.appendChild(Text.text_cont.at(-1));
        Text.text_obj.push(new SetText(Text.text_cont[i], Data.title[i], Data.subtitle[i], e));
    });
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetText {
    constructor(cont, title, subtitle, txt) {
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
        this.setTitle(cont, title, subtitle, txt);
        this.setClick();
    }

    setTitle = (cont, title, subtitle, txt) => {
        this.Elt.title.push(document.createElement("div"));
        this.Elt.title.at(-1).className = "title";
        for (this.i = 0; this.i < 20; this.i++) this.Elt.title.at(-1).innerHTML += title;
        cont.appendChild(this.Elt.title.at(-1));
        for (this.j = 0; this.j < 2; this.j++) {
            this.Elt.title_line.push(document.createElement("div"));
            this.Elt.title_line.at(-1).className = "title_line";
        }
        cont.appendChild(this.Elt.title_line[0]);
        this.setScene(cont, subtitle, txt);
        cont.appendChild(this.Elt.title_line[1]);
        this.Elt.title.push(document.createElement("div"));
        this.Elt.title.at(-1).className = "title";
        for (this.i = 0; this.i < 20; this.i++) this.Elt.title.at(-1).innerHTML += title;
        cont.appendChild(this.Elt.title.at(-1));
    }

    setScene = (cont, subtitle, txt) => {
        this.scene_idx = 0;
        this.txt_idx = 0;
        txt.forEach((e, i) => {
            if (e.length > 1) {
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

    setText = (idx, cont, subtitle, txt) => {
        this.Elt.item.push(document.createElement("div"));
        this.Elt.item[idx].className = "item";
        this.Elt.text.push(document.createElement("div"));
        this.Elt.text[idx].className = "text";
        this.Elt.text[idx].innerHTML = txt[0];
        if (subtitle == undefined) {
            this.Elt.text[idx].className = "long_text";
            if (cont.id == "container_1" && idx == textMuybridge.length - 1) this.Elt.text[idx].style.fontWeight = "bolder"
            cont.appendChild(this.Elt.item[idx]);
            this.Elt.item[idx].appendChild(this.Elt.text[idx]);
        } else {
            this.Elt.subtitle.push(document.createElement("div"));
            this.Elt.subtitle[idx].className = "subtitle";
            this.Elt.subtitle[idx].innerHTML = subtitle[idx];
            cont.appendChild(this.Elt.subtitle[idx]);
            this.Elt.subtitle[idx].appendChild(this.Elt.item[idx]);
            this.lines = [];
            this.lines.push(document.createElement("div"));
            this.lines[0].className = "subtitle_line";
            this.Elt.item[idx].appendChild(this.lines[0])
            this.Elt.item[idx].appendChild(this.Elt.text[idx]);
            this.lines.push(document.createElement("div"));
            this.lines[1].className = "subtitle_line";
            this.Elt.item[idx].appendChild(this.lines[1]);
            this.Elt.line.push(this.lines);
        }
    }

    setClick = () => {
        if (this.Elt.subtitle.length > 0) {
            this.Elt.title.forEach(e => {
                e.onpointerup = () => { this.runTitleAnim() };
            });
            this.Elt.title_line.forEach(e => {
                e.onpointerup = () => { this.runTitleAnim() };
            });
            this.Elt.subtitle.forEach((e, i) => {
                e.onpointerup = () => { this.runTextAnim(i) };
            });
        } else {
            this.Elt.title.forEach(e => {
                e.onpointerup = () => {
                    this.Elt.item.forEach((e, i) => { this.runLongTextAnim(i) });
                };
            });
            this.Elt.title_line.forEach(e => {
                e.onpointerup = () => {
                    this.Elt.item.forEach((f, j) => { this.runLongTextAnim(j) });
                }
            });
            this.Elt.item.forEach((e, i) => {
                e.onpointerup = () => { this.runLongTextAnim(i) };
            });
        }
    }

    runTitleAnim = () => {
        if (this.isOpen) {
            this.Opt.direction = "reverse";
            this.Elt.subtitle.forEach(e => e.style.pointerEvents = "none");
        } else {
            this.Opt.direction = "normal";
            this.Elt.subtitle.forEach(e => e.style.pointerEvents = "all");
        }
        this.isOpen = !this.isOpen;
        if (this.Elt.scene.length > 0) {
            this.Elt.scene.forEach(e => {
                e.animate(this.Key_f.line_height, this.Opt);
                e.animate(this.Key_f.margin, this.Opt);
            });
        }
        this.Elt.subtitle.forEach(e => {
            e.animate(this.Key_f.line_height, this.Opt);
            e.animate(this.Key_f.margin, this.Opt);
        });
        this.Elt.line.forEach(e => {
            e.forEach(f => { f.animate(this.Key_f.height, this.Opt) });
        });
        this.Elt.text.forEach(e => {
            this.st = window.getComputedStyle(e);
            this.line_h = this.st.getPropertyValue("line-height");
            if (this.line_h != "0px") {
                e.animate(this.Key_f.line_height, this.Opt);
                e.animate(this.Key_f.margin, this.Opt);
                e.animate(this.Key_f.opacity, this.Opt);
            }
        });
    }

    runTextAnim = (idx) => {
        this.st = window.getComputedStyle(this.Elt.text[idx]);
        this.line_h = this.st.getPropertyValue("line-height");
        if (this.line_h == "0px") {
            this.Opt.direction = "normal";
            this.Elt.text[idx].style.pointerEvents = "all";
        } else {
            this.Opt.direction = "reverse";
            this.Elt.text[idx].style.pointerEvents = "none";
        }
        this.Elt.text[idx].animate(this.Key_f.line_height, this.Opt);
        this.Elt.text[idx].animate(this.Key_f.margin, this.Opt);
        this.Elt.text[idx].animate(this.Key_f.opacity, this.Opt);
    }

    runLongTextAnim = (idx) => {
        this.st = window.getComputedStyle(this.Elt.text[idx]);
        this.line_h = this.st.getPropertyValue("line-height");
        this.Elt.text.forEach((e) => {
            if (this.line_h == "0px") {
                this.Opt.direction = "normal";
                e.style.pointerEvents = "all";
            } else {
                this.Opt.direction = "reverse";
                e.style.pointerEvents = "none";
            }
            e.animate(this.Key_f.line_height, this.Opt);
            e.animate(this.Key_f.margin, this.Opt);
            e.animate(this.Key_f.opacity, this.Opt);
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

TextF.initMuybridge();
TextF.setCont();