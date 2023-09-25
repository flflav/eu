class SetContent {
    constructor() {
        this.Title = [
            titleTerror,
            titleMuybridge
        ];
        this.Subtitle = [
            subtitleTerror,
            undefined
        ];
        this.Text = [
            textTerror
        ];
        this.Elt = {
            content_contaienr: document.getElementById("content_container"),
            text_container: [],
            text_obj: []
        }
        this.setMuybridge(textMuybridge);
        this.setContainer();
        this.setText();
    }

    setMuybridge = (get_text) => {
        this.temp = [];
        this.i = 0;
        while (this.i < get_text.length - 1) {
            this.temp.push(get_text[this.i]);
            this.i++;
        }
        this.rand_muybridge = shuffleArray(this.temp);
        this.rand_muybridge.push(get_text.at(-1));
        this.Text.push(this.rand_muybridge);
    }

    setContainer = () => {
        this.Text.forEach((e, i) => {
            this.Elt.text_container.push(document.createElement("div"));
            this.Elt.text_container.at(-1).className = "text_container";
            this.Elt.text_container.at(-1).id = `container_${i}`;
            this.Elt.content_contaienr.appendChild(this.Elt.text_container.at(-1));
        });
    }

    setText = () => {
        this.Text.forEach((e, i) => {
            this.Elt.text_obj.push(new SetText(this.Elt.text_container[i], this.Title[i], this.Subtitle[i], e));
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetText {
    constructor(container, title, subtitle, text) {
        this.Elt = {
            title: undefined,
            title_line: [],
            scene: [],
            subtitle: [],
            item: [],
            line: [],
            text: []
        };
        this.Keyframes = {
            line_height: undefined,
            margin: undefined,
            height: undefined,
            opacity: undefined
        };
        this.Options = {
            duration: 1500,
            fill: "forwards",
            easing: "ease-in-out",
            direction: "normal"
        };
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
        for (this.i = 0; this.i < 2; this.i++) {
            this.Elt.title_line.push(document.createElement("div"));
            this.Elt.title_line.at(-1).className = "title_line";
        }
        container.appendChild(this.Elt.title_line[0]);
        this.setScene(container, subtitle, text);
        this.Elt.title_line.at(-1).id = "lower_line";
        container.appendChild(this.Elt.title_line[1]);
    }

    setScene = (container, subtitle, text) => {
        this.scene_index = 0;
        this.text_index = 0;
        text.forEach((e, i) => {
            if (e.length > 1) {
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
        this.Elt.text.push(document.createElement("div"));
        this.Elt.text[index].className = "text";
        this.Elt.text[index].innerHTML = text[0];
        if (subtitle == undefined) {
            this.Elt.text[index].className = "long_text";
            if (container.id == "container_1" && index == textMuybridge.length - 1) this.Elt.text[index].style.fontWeight = "bolder";
            container.appendChild(this.Elt.item[index]);
            this.Elt.item[index].appendChild(this.Elt.text[index]);

        } else {
            this.Elt.subtitle.push(document.createElement("div"));
            this.Elt.subtitle[index].className = "subtitle";
            this.Elt.subtitle[index].innerHTML = subtitle[index];
            container.appendChild(this.Elt.subtitle[index]);
            this.Elt.subtitle[index].appendChild(this.Elt.item[index]);
            this.lines = [];
            this.lines.push(document.createElement("div"))
            this.lines[0].className = "subtitle_line";
            this.Elt.item[index].appendChild(this.lines[0]);
            this.Elt.item[index].appendChild(this.Elt.text[index]);
            this.lines.push(document.createElement("div"))
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
        if (this.Elt.subtitle.length > 0) {
            this.Elt.title.onpointerup = () => { this.runTitleAnimation() };
            this.Elt.title_line.forEach(e => {
                e.onpointerup = () => { this.runTitleAnimation() };
            });
            this.Elt.subtitle.forEach((e, i) => {
                e.onpointerup = () => { this.runTextAnimation(i) };
            });
        } else {
            this.Elt.title.onpointerup = () => {
                this.Elt.item.forEach((e, i) => { this.runLongTextAnimation(i) });
            };
            this.Elt.title_line.forEach(e => {
                e.onpointerup = () => {
                    this.Elt.item.forEach((f, j) => { this.runLongTextAnimation(j) });
                }
            });
            this.Elt.item.forEach((e, i) => {
                e.onpointerup = () => { this.runLongTextAnimation(i) };
            });
        }
    }

    runTitleAnimation = () => {
        if (this.isOpen) {
            this.Options.direction = "reverse";
            this.Elt.subtitle.forEach(e => e.style.pointerEvents = "none");
        } else {
            this.Options.direction = "normal";
            this.Elt.subtitle.forEach(e => e.style.pointerEvents = "all");
        }
        this.isOpen = !this.isOpen;
        if (this.Elt.scene.length > 0) {
            this.Elt.scene.forEach(e => {
                e.animate(this.Keyframes.line_height, this.Options);
                e.animate(this.Keyframes.margin, this.Options);
            });
        }
        this.Elt.subtitle.forEach(e => {
            e.animate(this.Keyframes.line_height, this.Options);
            e.animate(this.Keyframes.margin, this.Options);
        });
        this.Elt.line.forEach(e => {
            e.forEach(f => {
                f.animate(this.Keyframes.height, this.Options);
            });
        });
        this.Elt.text.forEach(e => {
            this.style = window.getComputedStyle(e);
            this.line_h = this.style.getPropertyValue("line-height");
            if (this.line_h != "0px") {
                e.animate(this.Keyframes.line_height, this.Options);
                e.animate(this.Keyframes.margin, this.Options);
                e.animate(this.Keyframes.opacity, this.Options);
            }
        });
    }

    runTextAnimation = (index) => {
        this.style = window.getComputedStyle(this.Elt.text[index]);
        this.line_h = this.style.getPropertyValue("line-height");
        if (this.line_h == "0px") {
            this.Options.direction = "normal";
            this.Elt.text[index].style.pointerEvents = "all";
        } else {
            this.Options.direction = "reverse";
            this.Elt.text[index].style.pointerEvents = "none";
        }
        this.Elt.text[index].animate(this.Keyframes.line_height, this.Options);
        this.Elt.text[index].animate(this.Keyframes.margin, this.Options);
        this.Elt.text[index].animate(this.Keyframes.opacity, this.Options);
    }

    runLongTextAnimation = (index) => {
        this.style = window.getComputedStyle(this.Elt.text[index]);
        this.line_h = this.style.getPropertyValue("line-height");
        this.Elt.text.forEach((e) => {
            if (this.line_h == "0px") {
                this.Options.direction = "normal";
                e.style.pointerEvents = "all";
            } else {
                this.Options.direction = "reverse";
                e.style.pointerEvents = "none";
            }
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