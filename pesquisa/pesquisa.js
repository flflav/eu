const Authors = [
    WaldemarCordeiro,
    ArlindoMachado,
    FrankDietrich,
    VilemFlusser,
    JonathanBenthall,
    MargitRosen,
    MarshallMcLuhan,
    DecioPignatari
];

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class DestroyContent {
    constructor() {
        this.Elt = {
            content_container: document.getElementById("content_container"),
            elements: [],
            text: []
        };
        this.Css = [
            "margin",
            "padding",
            "width",
            "height",
            "font-size",
            "line-height",
            "z-index",
            "color",
            "background-color",
            "display",
            "opacity"
        ];
        this.Values = [
            [0, window.innerWidth],
            [0, window.innerHeight],
            [16, 150],
            [0.5, 2],
            [-3, 3],
            [0, 255],
            ["block", "inline", "flex"],
            ["row", "column"],
            [0.2, 1.0]
        ];
        this.Restrict = {
            img: [0, 1, 2, 3, 6, 9, 10]
        };
        this.setPg();
        this.getElements();
        this.Elt.elements.forEach(e => this.destroyPosition(e));
        this.Elt.text.forEach(e => this.destroyPosition(e));
    }

    setPg = () => {
        this.Elt.content_container.innerHTML = Authors[randomInt(0, Authors.length)];
    }

    getElements = () => {
        this.pushElements(this.Elt.content_container);
    }

    pushElements = (elt) => {
        if (elt.children.length == 0) return;
        else {
            elt.children.forEach(e => {
                if (e.className == "text") this.Elt.text.push(e);
                else if (e.localName != "br") this.Elt.elements.push(e);
                this.pushElements(e);
            });
        }
    }

    runDestruction = () => {
        this.setDestruction(this.Elt.elements);
        this.setDestruction(this.Elt.text);
    }

    setDestruction = (elt_array) => {
        this.rand_elt = randomInt(0, elt_array.length);
        this.elt = elt_array[this.rand_elt];
        this.rand_css = this.Css[randomInt(0, this.Css.length)];
        if (this.elt.localName == "img") this.destroy(this.elt, this.Restrict.img[randomInt(0, this.Restrict.img.length)]);
        else this.destroy(this.elt, randomInt(0, this.Css.length));
    }

    destroy = (elt, css_index) => {
        this.css_text = "";
        switch (true) {
            case css_index <= 1:
                this.max_w = this.Values[0][1] / 15;
                this.max_h = this.Values[1][1] / 15;
                this.top = randomIntInc(this.Values[1][0], this.max_h);
                this.right = randomIntInc(this.Values[0][0], this.max_w);
                this.bottom = randomIntInc(this.Values[1][0], this.max_h);
                this.left = randomIntInc(this.Values[0][0], this.max_w);
                this.css_text = `${this.top} ${this.right} ${this.bottom} ${this.left}`;
                break;
            case css_index == 2:
                this.max_w = this.Values[0][1];
                this.css_text = `${randomIntInc(this.Values[0][0], this.max_w)}px`;
                break;
            case css_index == 3:
                this.max_h = this.Values[0][1];
                this.css_text = `${randomIntInc(this.Values[1][0], this.max_h)}px`;
                break;
            case css_index == 4:
                this.css_text = `${randomIntInc(this.Values[2][0], this.Values[2][1])}px`;
                break;
            case css_index == 5:
                this.css_text = `${randomIntInc(this.Values[3][0], this.Values[3][1])}`;
                break;
            case css_index == 6:
                this.css_text = `${randomIntInc(this.Values[4][0], this.Values[4][1])}`;
                break;
            case css_index == 7:
                this.r = randomIntInc(this.Values[5][0], this.Values[5][1]);
                this.g = randomIntInc(this.Values[5][0], this.Values[5][1]);
                this.b = randomIntInc(this.Values[5][0], this.Values[5][1]);
                this.a = randomIntInc(this.Values[5][0], this.Values[5][1] / 2);
                this.css_text = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
                break;
            case css_index == 8:
                this.r = randomIntInc(this.Values[5][0], this.Values[5][1]);
                this.g = randomIntInc(this.Values[5][0], this.Values[5][1]);
                this.b = randomIntInc(this.Values[5][0], this.Values[5][1]);
                this.a = 0.05;
                this.css_text = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
                break;
            case css_index == 9:
                this.css_text = `${this.Values[6][randomInt(0, this.Values[6].length)]}`;
                if (this.css_text == "flex");
                this.flex_text = `${this.Values[7][randomInt(0, this.Values[7].length)]}`;
                elt.style.setProperty("flex-direction", this.flex_text);
                break;
            case css_index == 10:
                this.css_text = `${randomFloat(this.Values[8][0]), this.Values[8][1]}`;
                break;
        }
        elt.style.setProperty(this.Css[css_index], this.css_text);
    }

    destroyPosition = (elt) => {
        this.vals = [
            [0, Math.floor(this.Elt.content_container.getBoundingClientRect().height)],
            [0, Math.floor(this.Elt.content_container.getBoundingClientRect().width) * 2]
        ]
        elt.style.position = "absolute";
        if (randomInt(0, 2) == 1) {
            elt.style.top = `${randomInt(this.vals[0][0], this.vals[0][1])}px`;
            elt.style.left = `${randomInt(this.vals[1][0], this.vals[1][1])}px`;
        }
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const destroy_content = new DestroyContent();