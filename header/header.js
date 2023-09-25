const EltHd = {
    container: document.getElementById("header_container"),
    header: document.getElementsByClassName("header"),
    letter: document.getElementsByClassName("letter"),
    name: document.getElementsByClassName("name"),
    red_box: document.getElementById("red_box")
}

const AnimHd = {
    keyframes: {
        container: undefined,
        header: undefined,
        header_bottom: undefined,
        letter: undefined,
        name: undefined,
        red_box: undefined
    },
    values: {
        container_size: "var(--containerSize)",
        margin_size: "var(--marginSize)",
        white: "var(--white)",
        black: "var(--black)",
        red: "var(--red)"
    },
    options: {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
        direction: Header.header_direction
    }
}

const EltBt = {
    body: document.getElementsByTagName("body")[0],
    header: document.getElementsByClassName("header"),
    name: document.getElementsByClassName("name"),
    letter: [],
    name_letter: [],
    link: document.getElementsByTagName("a"),
    info: document.getElementById("info")
}

const AnimBt = {
    keyframes: {
        buttom_pressed: undefined,
        buttom_outline: undefined
    },
    values: {
        container_size: "var(--containerSize)",
        margin_size: "var(--marginSize)",
        white: "var(--white)",
        black: "var(--black)",
    },
    options: {
        duration: 300,
        easing: "step-start"
    }
}

const EltDt = {
    body: document.getElementsByTagName("body")[0],
    elements: []
}

const PropDt = [
    "margin",
    "padding",
    "width",
    "left",
    "right",
    "height",
    "top",
    "bottom",
    "font-size",
    "line-height",
    "z-index",
    "color",
    "background-color",
    "outline",
    "position",
    "display",
    "flex-direction"
]

const ValDt = [
    [0, window.innerWidth / 15],
    [0, window.innerWidth / 3],
    [0, window.innerHeight / 3],
    [0, 150],
    [-2, 2],
    [0, 255],
    ["absolute", "relative", "fixed"],
    ["block", "inline", "flex"],
    ["row", "column"]
]

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetHeader {
    constructor() {
        this.setCss();
        this.setKeyframes();
        this.setClick();
    }

    setCss = () => {
        if (Header.current_page == 0) {
            EltHd.container.style.padding = `calc(${AnimHd.values.container_size} / 3)`;
            EltHd.container.style.backgroundColor = AnimHd.values.red;
            EltHd.container.style.outline = `${AnimHd.values.margin_size} solid ${AnimHd.values.red}`;
            [...EltHd.header].map((e, i) => {
                e.style.marginLeft = "0";
                e.style.height = "0";
                if (i == 1) e.style.marginBottom = "0";
            });
            [...EltHd.letter].map(e => {
                e.style.width = "0";
                e.style.margin = "0";
                e.style.fontSize = "0";
                e.style.color = AnimHd.values.red;
                e.style.backgroundColor = AnimHd.values.red;
            });
            EltHd.red_box.style.width = "0";
            EltHd.red_box.style.margin = "0";
            EltHd.red_box.style.backgroundColor = AnimHd.values.red;
        }
    }

    setKeyframes = () => {
        AnimHd.keyframes.container = [
            {
                padding: `calc(${AnimHd.values.container_size} / 3)`,
                backgroundColor: AnimHd.values.red,
                outline: `${AnimHd.values.margin_size} solid ${AnimHd.values.red}`
            },
            {
                padding: "0",
                backgroundColor: AnimHd.values.white,
                outline: `${AnimHd.values.margin_size} solid ${AnimHd.values.black}`
            }
        ];
        AnimHd.keyframes.header = [
            {
                marginLeft: "0",
                height: "0"
            },
            {
                marginLeft: AnimHd.values.margin_size,
                height: `calc(${AnimHd.values.container_size} / 2)`
            }
        ];
        AnimHd.keyframes.header_bottom = [
            {
                marginBottom: "0"
            },
            {
                marginBottom: AnimHd.values.margin_size
            }
        ];
        AnimHd.keyframes.letter = [
            {
                width: "0",
                margin: "0",
                fontSize: "0",
                color: AnimHd.values.red,
                backgroundColor: AnimHd.values.red
            },
            {
                width: `calc(${AnimHd.values.container_size} / 2)`,
                margin: `${AnimHd.values.margin_size} ${AnimHd.values.margin_size} 0 0`,
                fontSize: `calc(${AnimHd.values.container_size} / 4)`,
                color: AnimHd.values.white,
                backgroundColor: AnimHd.values.black
            }
        ];
        AnimHd.keyframes.red_box = [
            {
                width: "0",
                margin: "0",
                backgroundColor: AnimHd.values.red
            },
            {
                width: `calc(${AnimHd.values.container_size} / 2)`,
                margin: `${AnimHd.values.margin_size} ${AnimHd.values.margin_size} 0 0`,
                backgroundColor: AnimHd.values.red
            }
        ];
    }

    setClick = () => {
        EltHd.red_box.onpointerdown = () => {
            if (!Header.header_closed) {
                AnimHd.options.direction = "reverse";
                this.runAnimation();
            }
        };
        EltHd.container.onpointerdown = () => {
            if (Header.header_closed) {
                AnimHd.options.direction = "normal";
                this.runAnimation();
            }
        };
    }

    runAnimation = () => {
        EltHd.container.animate(AnimHd.keyframes.container, AnimHd.options);
        [...EltHd.header].map((e, i) => {
            e.animate(AnimHd.keyframes.header, AnimHd.options);
            if (i == 1) e.animate(AnimHd.keyframes.header_bottom, AnimHd.options);
        });
        [...EltHd.letter].map(e => e.animate(AnimHd.keyframes.letter, AnimHd.options));
        EltHd.red_box.animate(AnimHd.keyframes.red_box, AnimHd.options);
        setTimeout(() => { Header.header_closed = !Header.header_closed }, AnimHd.options);
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetButtons {
    constructor() {
        this.infoVisible = false;
        this.setLetter();
        this.setKeyframes();
        this.setClick();
    }

    setLetter = () => {
        [...document.getElementsByClassName("letter")].map(e => {
            if (e.parentElement.className == "name") EltBt.name_letter.push(e);
            else EltBt.letter.push(e);
        });
    }

    setKeyframes = () => {
        AnimBt.keyframes.buttom_pressed = [
            {
                fontSize: `calc(${AnimBt.values.container_size} / 4)`,
                color: AnimBt.values.white,
                backgroundColor: AnimBt.values.black

            },
            {
                fontSize: `calc(${AnimBt.values.container_size} / 2.5)`,
                color: AnimBt.values.black,
                backgroundColor: AnimBt.values.white
            }
        ];
        AnimBt.keyframes.buttom_outline = [
            {
                outline: "none"
            },
            {
                outline: `${AnimBt.values.margin_size} solid ${AnimBt.values.black}`
            }
        ];
    }

    setClick = () => {
        EltBt.letter.forEach((e, i) => {
            if (i != Header.current_page && e.id != "red_box") {
                e.onpointerdown = () => {
                    startDestruction();
                    this.runAnimation(e, AnimBt.keyframes.buttom_pressed);
                    this.runAnimation(e, AnimBt.keyframes.buttom_outline);
                    if (e.innerText == "Z") {
                        EltBt.body.style.overflow = "auto";
                        setTimeout(() => { EltBt.info.style.display = "flex" }, randomInt(2000, 4000));
                    } else {
                        setTimeout(() => { EltBt.link[i].click() }, 2000);
                    }
                }
            }
        });
        EltBt.name_letter.forEach((e, i) => {
            e.onpointerdown = (f) => {
                this.runAnimation(e.parentElement, AnimBt.keyframes.buttom_pressed);
                this.runAnimation(e.parentElement, AnimBt.keyframes.buttom_outline);
                [...e.parentElement.children].map(g => this.runAnimation(g, AnimBt.keyframes.buttom_pressed));
                setTimeout(() => {
                    if (i == 0) this.setInfo(f.pageY - 70);
                    else this.setInfo(f.pageY - 120);
                }, AnimBt.options.duration + 60);
            }
        });
        document.onpointerup = () => {
            if (this.infoVisible) {
                EltBt.info.style.display = "none";
                this.infoVisible = !this.infoVisible;
            }
        }
    }

    runAnimation = (elt, keyframes) => {
        elt.animate(keyframes, AnimBt.options);
    }

    setInfo = (y) => {
        if (!this.infoVisible) {
            EltBt.info.style.top = `${y}px`;
            EltBt.info.style.display = "flex";
        } else {
            EltBt.info.style.display = "none";
        }
        this.infoVisible = !this.infoVisible;
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetDestruction {
    getElements = () => {
        EltDt.elements = [];
        EltDt.elements.push(EltDt.body);
        this.pushElements(EltDt.body);
    }

    pushElements = (elt) => {
        if (elt.children.length == 0) return;
        else {
            [...elt.children].map(e => {
                if (e.localName != "a") EltDt.elements.push(e);
                this.pushElements(e);
            });
        }
    }

    destroy = () => {
        if (Header.current_page == 5 || Header.current_page == 6) textDestruction();
        this.sel_element = randomInt(0, EltDt.elements.length);
        this.sel_property = randomInt(0, PropDt.length);
        this.get_element = EltDt.elements[this.sel_element];
        this.get_property = PropDt[this.sel_property];
        this.css_text = ``;
        switch (true) {
            case this.sel_property <= 1:
                this.css_text = `${randomIntInc(ValDt[0][0], ValDt[0][1])}px`;
                break;
            case this.sel_property >= 2 && this.sel_property <= 4:
                this.css_text = `${randomIntInc(ValDt[1][0], ValDt[1][1])}px`;
                break;
            case this.sel_property >= 5 && this.sel_property <= 7:
                this.css_text = `${randomIntInc(ValDt[2][0], ValDt[2][1])}px`;
                break;
            case this.sel_property >= 8 && this.sel_property <= 9:
                this.css_text = `${randomIntInc(ValDt[3][0], ValDt[3][1])}px`;
                break;
            case this.sel_property == 10:
                this.css_text = `${randomIntInc(ValDt[4][0], ValDt[4][1])}px`;
                break;
            case this.sel_property >= 11 && this.sel_property <= 13:
                this.r = randomIntInc(ValDt[5][0], ValDt[5][1]);
                this.g = randomIntInc(ValDt[5][0], ValDt[5][1]);
                this.b = randomIntInc(ValDt[5][0], ValDt[5][1]);
                this.a = randomIntInc(ValDt[5][0], ValDt[5][1]);
                this.css_text = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
                if (this.sel_property == 13) {
                    this.outline_size = randomIntInc(ValDt[0][0], ValDt[0][1]);
                    this.css_text = `${this.outline_size}px solid rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
                }
                break;
            case this.sel_property == 14:
                this.css_text = randomInt(0, ValDt[6].length);
                break;
            case this.sel_property == 15:
                this.css_text = randomInt(0, ValDt[7].length);
                break;
            case this.sel_property == 15:
                this.css_text = randomInt(0, ValDt[8].length);
                break;
        }
        this.get_element.style.setProperty(this.get_property, this.css_text);
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const setHeader = new SetHeader();
const setButtons = new SetButtons();
const setDestruction = new SetDestruction();

function startDestruction() {
    setInterval(() => {
        setDestruction.destroy();
    }, randomInt(15, 60));
}