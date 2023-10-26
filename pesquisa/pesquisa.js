// const Authors = [
//     WaldemarCordeiro,
//     ArlindoMachado,
//     FrankDietrich,
//     VilemFlusser,
//     JonathanBenthall,
//     MargitRosen,
//     MarshallMcLuhan,
//     DecioPignatari
// ];

// //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
// //##########################################################################//
// //##########################################################################//
// //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

// class DestroyContent {
//     constructor() {
//         this.Elt = {
//             content_container: document.getElementById("content_container"),
//             elements: [],
//             text: []
//         };
//         this.Css = [
//             "margin",
//             "padding",
//             "width",
//             "height",
//             "font-size",
//             "line-height",
//             "z-index",
//             "color",
//             "background-color",
//             "display",
//             "opacity"
//         ];
//         this.Values = [
//             [0, window.innerWidth],
//             [0, window.innerHeight],
//             [16, 150],
//             [0.5, 2],
//             [-3, 3],
//             [0, 255],
//             ["block", "inline", "flex"],
//             ["row", "column"],
//             [0.2, 1.0]
//         ];
//         this.Restrict = {
//             img: [0, 1, 2, 3, 6, 9, 10]
//         };
//         this.setPg();
//         this.getElements();
//         this.Elt.elements.forEach(e => this.destroyPosition(e));
//         this.Elt.text.forEach(e => this.destroyPosition(e));
//     }

//     setPg = () => {
//         this.Elt.content_container.innerHTML = Authors[randomInt(0, Authors.length)];
//     }

//     getElements = () => {
//         this.pushElements(this.Elt.content_container);
//     }

//     pushElements = (elt) => {
//         if (elt.children.length == 0) {
//             return;
//         } else {
//             [...elt.children].map(e => {
//                 if (e.className == "text") this.Elt.text.push(e);
//                 else if (e.localName != "br") this.Elt.elements.push(e);
//                 this.pushElements(e);
//             });
//         }
//     }

//     runDestruction = () => {
//         this.setDestruction(this.Elt.elements);
//         this.setDestruction(this.Elt.text);
//     }

//     setDestruction = (elt_array) => {
//         this.rand_elt = randomInt(0, elt_array.length);
//         this.elt = elt_array[this.rand_elt];
//         this.rand_css = this.Css[randomInt(0, this.Css.length)];
//         if (this.elt.localName == "img") this.destroy(this.elt, this.Restrict.img[randomInt(0, this.Restrict.img.length)]);
//         else this.destroy(this.elt, randomInt(0, this.Css.length));
//     }

//     destroy = (elt, css_index) => {
//         this.css_text = "";
//         switch (true) {
//             case css_index <= 1:
//                 this.max_w = this.Values[0][1] / 15;
//                 this.max_h = this.Values[1][1] / 15;
//                 this.top = randomIntInc(this.Values[1][0], this.max_h);
//                 this.right = randomIntInc(this.Values[0][0], this.max_w);
//                 this.bottom = randomIntInc(this.Values[1][0], this.max_h);
//                 this.left = randomIntInc(this.Values[0][0], this.max_w);
//                 this.css_text = `${this.top} ${this.right} ${this.bottom} ${this.left}`;
//                 break;
//             case css_index == 2:
//                 this.max_w = this.Values[0][1];
//                 this.css_text = `${randomIntInc(this.Values[0][0], this.max_w)}px`;
//                 break;
//             case css_index == 3:
//                 this.max_h = this.Values[0][1];
//                 this.css_text = `${randomIntInc(this.Values[1][0], this.max_h)}px`;
//                 break;
//             case css_index == 4:
//                 this.css_text = `${randomIntInc(this.Values[2][0], this.Values[2][1])}px`;
//                 break;
//             case css_index == 5:
//                 this.css_text = `${randomIntInc(this.Values[3][0], this.Values[3][1])}`;
//                 break;
//             case css_index == 6:
//                 this.css_text = `${randomIntInc(this.Values[4][0], this.Values[4][1])}`;
//                 break;
//             case css_index == 7:
//                 this.r = randomIntInc(this.Values[5][0], this.Values[5][1]);
//                 this.g = randomIntInc(this.Values[5][0], this.Values[5][1]);
//                 this.b = randomIntInc(this.Values[5][0], this.Values[5][1]);
//                 this.a = randomIntInc(this.Values[5][0], this.Values[5][1] / 2);
//                 this.css_text = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
//                 break;
//             case css_index == 8:
//                 this.r = randomIntInc(this.Values[5][0], this.Values[5][1]);
//                 this.g = randomIntInc(this.Values[5][0], this.Values[5][1]);
//                 this.b = randomIntInc(this.Values[5][0], this.Values[5][1]);
//                 this.a = 0.05;
//                 this.css_text = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
//                 break;
//             case css_index == 9:
//                 this.css_text = `${this.Values[6][randomInt(0, this.Values[6].length)]}`;
//                 if (this.css_text == "flex");
//                 this.flex_text = `${this.Values[7][randomInt(0, this.Values[7].length)]}`;
//                 elt.style.setProperty("flex-direction", this.flex_text);
//                 break;
//             case css_index == 10:
//                 this.css_text = `${randomFloat(this.Values[8][0]), this.Values[8][1]}`;
//                 break;
//         }
//         elt.style.setProperty(this.Css[css_index], this.css_text);
//     }

//     destroyPosition = (elt) => {
//         this.vals = [
//             [0, Math.floor(this.Elt.content_container.getBoundingClientRect().height)],
//             [0, Math.floor(this.Elt.content_container.getBoundingClientRect().width) * 2]
//         ]
//         elt.style.position = "absolute";
//         if (randomInt(0, 2) == 1) {
//             elt.style.top = `${randomInt(this.vals[0][0], this.vals[0][1])}px`;
//             elt.style.left = `${randomInt(this.vals[1][0], this.vals[1][1])}px`;
//         }
//     }
// }

// //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
// //##########################################################################//
// //##########################################################################//
// //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

// const destroy_content = new DestroyContent();

// let pre_destroy = setInterval(() => {
//     destroy_content.runDestruction();
// }, 1);
// setTimeout(() => {
//     // document.getElementById("cover").style.display = "none";
//     clearInterval(pre_destroy);
// }, 2000);

const Data = {
    authors: [
        WaldemarCordeiro,
        ArlindoMachado,
        FrankDietrich,
        VilemFlusser,
        JonathanBenthall,
        MargitRosen,
        MarshallMcLuhan,
        DecioPignatari
    ]
}

const Res = {
    cont: document.getElementById("content_container"),
    elt: [],
    text: [],
    prop: [
        "margin", // 0
        "padding", // 1
        "width", // 2
        "height", // 3
        "font-size", // 4
        "line-height", // 5
        "z-index", // 6
        "color", // 7
        "background-color", // 8
        "display", // 9
        "flex-direction", // 10
        "opacity" // 11
    ],
    val: [
        [0, window.innerWidth / 15], // margin
        [0, window.innerWidth / 15], // padding
        [0, window.innerWidth], // width
        [0, window.innerHeight], // height
        [16, 150], // font-size
        [16, 150], // line-height
        [-3, 3], // z-index
        [0, 255], // color
        [0, 255], // background-color
        ["block", "inline", "flex"], // display
        ["row", "column"], // flex-direction
        [0.2, 1] // opacity
    ],
    restrict: [
        0, 1, 2, 3, 5, 6, 9, 11
    ]
}

const ResF = {}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

ResF.setPg = () => {
    Res.cont.innerHTML = Data.authors[randomInt(0, Data.authors.length)];
    ResF.getElt();
}

ResF.getElt = () => {
    Res.elt = [];
    // Res.elt.push(document.getElementsByTagName("body")[0]);
    Res.elt.push(Res.cont);
    ResF.pushElt(Res.elt[0]);
}

ResF.pushElt = (elt) => {
    if (elt.children.length == 0) return;
    else {
        [...elt.children].map(e => {
            if (e.className == "text") Res.text.push(e);
            else if (e.localName != "br") Res.elt.push(e);
            ResF.pushElt(e);
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

ResF.setDestruction = () => {
    Res.elt.forEach(e => ResF.destroyPosition(e));
    Res.text.forEach(e => ResF.destroyPosition(e));
    ResF.runDestruction(Res.elt);
    ResF.runDestruction(Res.text);
}

ResF.runDestruction = (elt_arr) => {
    let rand_elt = randomInt(0, elt_arr.length)
    let elt = elt_arr[rand_elt];
    if (elt.localName == "img") ResF.destroy(elt, Res.restrict[randomInt(0, Res.restrict.length)]);
    else ResF.destroy(elt, randomInt(0, Res.prop.length));
}

ResF.destroy = (elt, prop_idx) => {
    let css_txt = "";
    if (prop_idx < 2) {
        let t = `${randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1])}`;
        let r = `${randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1])}`;
        let b = `${randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1])}`;
        let l = `${randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1])}`;
        css_txt = `${t} ${r} ${b} ${l}`
    } else if (prop_idx > 1 && prop_idx < 6) {
        css_txt = `${randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1])}px`;
    } else if (prop_idx == 6) {
        css_txt = `${randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1])}`;
    } else if (prop_idx > 6 && prop_idx < 9) {
        let r = randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1]);
        let g = randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1]);
        let b = randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1]);
        let a = (prop_idx == 8) ? 0.5 : randomInt(Res.val[prop_idx][0], Res.val[prop_idx][1] / 2);
        css_txt = `rgba(${r}, ${g}, ${b}, ${a})`;
    } else if (prop_idx > 8 && prop_idx < 11) {
        // css_txt = Res.val[9][randomInt[0, Res.val[9].length]];
        // if (css_txt == "flex") elt.style.flexDirection = Res.val[10][randomInt(0, Res.val[10].length)];
    } else {
        css_txt = `${randomFloat(Res.val[prop_idx][0]), Res.val[prop_idx][1]}`;
    }
    elt.style.setProperty(Res.prop[prop_idx], css_txt);
}

ResF.destroyPosition = (elt) => {
    let vals = [
        [100, Math.floor(Res.cont.getBoundingClientRect().height) * 2],
        [100, Math.floor(Res.cont.getBoundingClientRect().width) * 2]
    ]
    elt.style.position = "absolute";
    if (randomInt(0, 2) == 1) {
        elt.style.top = `${randomInt(vals[0][0], vals[0][1])}px`;
        elt.style.left = `${randomInt(vals[1][0], vals[1][1])}px`;
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

ResF.setPg();
ResF.setDestruction();