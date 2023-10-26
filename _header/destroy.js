const Dt = {
    elt: [],
    prop: [
        "margin",
        "padding",
        "width",
        "left",
        "right",
        "height",
        "top",
        "bottom",
        "border-radius",
        "font-size",
        "line-height",
        "z-index",
        "color",
        "background-color",
        "outline",        
        "position",
        "display",
        "flex-direction"
    ],
    val: [
        [0, window.innerWidth / 15], // margin
        [0, window.innerWidth / 15], // padding
        [0, window.innerWidth / 3], // width
        [0, window.innerWidth / 3], // left
        [0, window.innerWidth / 3], // right
        [0, window.innerHeight / 3], // height
        [0, window.innerHeight / 3], // top
        [0, window.innerHeight / 3], // bottom
        [0, 150], // border-radius
        [0, 150], // font-size
        [0, 150], // line-height
        [-2, 2], // z-index
        [0, 255], // color
        [0, 255], // background-color
        [0, 255], // outline
        ["absolute", "relative", "fixed"], // position
        ["block", "inline", "flex"], // display
        ["row", "column"] //flex-direction

    ]
}

const DtF = new Object();

DtF.getElt = () => {
    Dt.elt = [];
    Dt.elt.push(document.getElementsByTagName("body")[0]);
    DtF.pushElt(Dt.elt[0]);
}

DtF.pushElt = (elt) => {
    if (elt.children.length == 0) return;
    else {
        [...elt.children].map(e => {
            if (e.localName != "a") Dt.elt.push(e);
            DtF.pushElt(e);
        });
    }
}

DtF.destroy = () => {
    let sel_elt = randomInt(0, Dt.elt.length);
    let sel_prop = randomInt(0, Dt.prop.length - 1);
    let get_elt = Dt.elt[sel_elt];
    let get_prop = Dt.prop[sel_prop];
    let css_txt = "";
    if (sel_prop < 12) {
        css_txt = `${randomInt(Dt.val[sel_prop][0], Dt.val[sel_prop][1])}px`;
        if (sel_prop == 8) css_txt = `${randomInt(Dt.val[sel_prop][0], Dt.val[sel_prop][1])}px`;
        if (sel_prop == 11) css_txt = `${randomInt(Dt.val[sel_prop][0], Dt.val[sel_prop][1])}`;
    } else if (sel_prop > 11 && sel_prop < 15) {
        let r = randomInt(Dt.val[sel_prop][0], Dt.val[sel_prop][1]);
        let g = randomInt(Dt.val[sel_prop][0], Dt.val[sel_prop][1]);
        let b = randomInt(Dt.val[sel_prop][0], Dt.val[sel_prop][1]);
        let a = randomInt(Dt.val[sel_prop][0], Dt.val[sel_prop][1]);
        css_txt = `rgba(${r}, ${g}, ${b}, ${a})`;
        if (sel_prop == 14) {
            let outline_sz = randomInt(Dt.val[0][0], Dt.val[0][1]);
            css_txt = `${outline_sz}px solid ` + css_txt;
        } 
    } else {
        css_txt = Dt.val[sel_prop][randomInt[0, Dt.val[sel_prop].length]];
        if (sel_prop == 16 && css_txt == "flex") get_elt.style.flexDirection = Dt.val[17][randomInt(0, Dt.val[17].length)];
    }
    get_elt.style.setProperty(get_prop, css_txt);
}