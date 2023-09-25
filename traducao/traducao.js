class SetContent {
    constructor() {
        this.Title = [
            titleShakespeare,
            titleCatulo,
            titleMMoore,
            titleCummings,
            titleZeami
        ];
        this.Subtitle = [
            subtitleShakespeare,
            subtitleCatulo,
            undefined,
            subtitleCummings,
            undefined
        ];
        this.Text = [
            textShakespeare,
            textCatulo,
            textMMoore,
            textCummings,
            textZeami
        ];
        this.Elt = {
            content_container: document.getElementById("content_container"),
            text_container: [],
            translation_obj: []
        }

        this.setContainer();
        this.setText();
    }

    setContainer = () => {
        this.Text.forEach((e, i) => {
            this.Elt.text_container.push(document.createElement("div"));
            this.Elt.text_container[i].className = "text_container";
            if (i == this.Text.length - 1) this.Elt.text_container[i].id = "last_text_container";
            this.Elt.content_container.appendChild(this.Elt.text_container[i]);
        });
    }

    setText = () => {
        this.Text.forEach((e, i) => {
            this.Elt.translation_obj.push(new SetTranslation(this.Elt.text_container[i], this.Title[i], this.Subtitle[i], e));
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetTranslation {
    constructor(container, title, subtitle, text) {
        this.Elt = {
            title: undefined,
            title_line: [],
            scene: [],
            subtitle: [],
            item: [],
            line: [],
            text: []
        }
        this.Keyframes = {
            line_height: undefined,
            margin: undefined,
            height: undefined,
            opacity: undefined
        }
        this.Options = {
            duration: 1500,
            fill: "forwards",
            easing: "ease-in-out",
            direction: "normal"
        }
        this.isOpen = false;
        this.setTitle(container, title, subtitle, text);
        this.setKeyframes();
        this.setClick();
    }

    setTitle = (container, title, subtitle, text) => {
        this.Elt.title = document.createElement("div");
        this.Elt.title.className = "title";
        this.Elt.title.innerHTML = title;
        container.appendChild(this.Elt.title);
        this.Elt.title_line.push(document.createElement("div"));
        this.Elt.title_line[0].className = "title_line";
        container.appendChild(this.Elt.title_line[0]);
        this.setScene(container, subtitle, text);
        this.Elt.title_line.push(document.createElement("div"));
        this.Elt.title_line[1].className = "title_line";
        this.Elt.title_line[1].id = "lower_line";
        container.appendChild(this.Elt.title_line[1]);
    }

    setScene = (container, subtitle, text) => {
        this.scene_index = 0;
        this.text_index = 0;
        text.forEach((e, i) => {
            if (e.length > 2) {
                this.Elt.scene.push(document.createElement("div"));
                this.Elt.scene[this.scene_index].className = "scene";
                this.Elt.scene[this.scene_index].innerHTML = text[i];
                container.appendChild(this.Elt.scene[this.scene_index]);
                this.scene_index++;
            } else {
                this.setText(this.text_index, container, subtitle, e);
                this.text_index++;
            }
        });
    }

    setText = (index, container, subtitle, text) => {
        this.Elt.item.push(document.createElement("div"));
        this.Elt.item[index].className = "item";
        this.text = [];
        this.text.push(document.createElement("div"));
        this.text[0].className = "text";
        this.text[0].innerHTML = text[0];
        this.text.push(document.createElement("div"));
        this.text[1].className = "text";
        this.text[1].innerHTML = text[1];
        if (subtitle == undefined) {
            container.appendChild(this.Elt.item[index]);
            this.Elt.item[index].appendChild(this.text[0]);
            this.Elt.item[index].appendChild(this.text[1]);
            this.Elt.text.push(this.text);
        } else {
            this.Elt.subtitle.push(document.createElement("div"));
            this.Elt.subtitle[index].className = "subtitle";
            this.Elt.subtitle[index].innerHTML = subtitle[index];
            container.appendChild(this.Elt.subtitle[index]);
            this.Elt.subtitle[index].appendChild(this.Elt.item[index]);
            this.lines = [];
            this.lines.push(document.createElement("div"));
            this.lines[0].className = "subtitle_line";
            this.Elt.item[index].appendChild(this.lines[0]);
            this.Elt.item[index].appendChild(this.text[0]);
            this.Elt.item[index].appendChild(this.text[1]);
            this.Elt.text.push(this.text);
            this.lines.push(document.createElement("div"));
            this.lines[1].className = "subtitle_line";
            this.Elt.item[index].appendChild(this.lines[1]);
            this.Elt.line.push(this.lines);
        }
    }

    setKeyframes = () => {
        this.Keyframes.line_height = [
            {
                lineHeight: "0"
            },
            {
                lineHeight: "1.2"
            }
        ];
        this.Keyframes.margin = [
            {
                margin: "0 0 0 0"
            },
            {
                margin: "var(--textMargin) 0 var(--textMargin) 0"
            }
        ];
        this.Keyframes.height = [
            {
                height: "0"
            },
            {
                height: "var(--textMargin)"
            }
        ];
        this.Keyframes.opacity = [
            {
                opacity: "0"
            },
            {
                opacity: "1", offset: 0.02
            },
            {
                opacity: "1"
            }
        ];
    }

    setClick = () => {
        this.Elt.title.onpointerdown = () => { this.runTitleAnimation() };
        this.Elt.title_line.forEach(e => {
            e.onpointerdown = () => { this.runTitleAnimation() };
        });
        if (this.Elt.subtitle.length > 0) {
            this.Elt.subtitle.forEach((e, i) => {
                e.onpointerdown = () => { this.runTextAnimation(i) };
            });
        } else {
            this.Elt.item.forEach((e, i) => {
                e.onpointerdown = () => { this.runTextAnimation(i) };
            });
        }
    }

    runTitleAnimation = () => {
        if (this.isOpen) {
            this.Options.direction = "reverse";
            this.Elt.subtitle.forEach((e) => e.style.pointerEvents = "none");
            this.Elt.text.forEach((e) => {
                e.forEach((f) => f.style.pointerEvents = "none");
            });
        } else {
            this.Options.direction = "normal";
            this.Elt.subtitle.forEach((e) => e.style.pointerEvents = "all");
            this.Elt.text.forEach((e) => {
                e.forEach((f) => f.style.pointerEvents = "all");
            });
        }
        this.isOpen = !this.isOpen;
        if (this.Elt.scene.length > 0) {
            this.Elt.scene.forEach((e) => {
                e.animate(this.Keyframes.line_height, this.Options);
                e.animate(this.Keyframes.margin, this.Options);
            });
        }
        if (this.Elt.subtitle.length > 0) {
            this.Elt.subtitle.forEach((e) => {
                e.animate(this.Keyframes.line_height, this.Options);
                e.animate(this.Keyframes.margin, this.Options);
            });
        } else {
            this.runTextAnimation(0);
        }
        if (this.Elt.line.length > 0) {
            this.Elt.line.forEach((e) => {
                e.forEach((f) => {
                    f.animate(this.Keyframes.height, this.Options);
                });
            });
        }
        this.Elt.text.forEach((e) => {
            this.style = window.getComputedStyle(e[0]);
            this.lineH = this.style.getPropertyValue("line-height");
            if (this.lineH != "0px") {
                e.forEach((f) => {
                    f.animate(this.Keyframes.line_height, this.Options);
                    f.animate(this.Keyframes.margin, this.Options);
                    f.animate(this.Keyframes.opacity, this.Options);
                });
            }
        });
    }

    runTextAnimation = (index) => {
        this.style = window.getComputedStyle(this.Elt.text[index][0]);
        this.line_h = this.style.getPropertyValue("line-height");
        if (this.line_h == "0px") {
            this.Options.direction = "normal";
            this.Elt.text[index].forEach((e) => e.style.pointerEvents = "all");
        } else {
            this.Options.direction = "reverse";
            this.Elt.text[index].forEach((e) => e.style.pointerEvents = "none");
        }
        this.Elt.text[index].forEach((e) => {
            e.animate(this.Keyframes.line_height, this.Options);
            e.animate(this.Keyframes.margin, this.Options);
            e.animate(this.Keyframes.opacity, this.Options);
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const set_content = new SetContent();