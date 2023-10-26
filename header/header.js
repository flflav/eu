const Head = {
    body: document.getElementsByTagName("body")[0],
    cont: undefined,
    btn_labels: [" ", "A", "B", "C", "D", "E", "F", "L", "A", "V", "W", "X", "Y", "Z"],
    btns: [],
    btn_i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    link_i: [1, 2, 3, 4, 5, 10, 11, 12, 13],
    info_i: [6, 7, 8, 9],
    a: document.getElementsByTagName("a"),
    info: document.getElementById("info"),
    curr_pg: 0
}

const HeadA = {
    anim_btn: {
        key_f: [
            {
                color: "var(--white)",
                backgroundColor: "var(--black)",
                outline: "none"
            },
            {
                color: "var(--black)",
                backgroundColor: "var(--white)",
                outline: "2px solid var(--black)"
            }
        ],
        opt: {
            duration: 300,
            easing: "step-start"
        }
    },
    anim_cont: {
        key_f: [
            {
                width: "var(--cont_size)",
                height: "var(--cont_size)",
                fontSize: "calc(var(--cont_size) * 0.5)",
                marginBottom: "5px"
            },
            {
                width: "0",
                height: "0",
                fontSize: "0",
                marginBottom: "0px"
            }
        ],
        opt: {
            duration: 300,
            fill: "forwards",
            easing: "ease-in-out",
            direction: "normal"
        }
    }
}

const HeadF = {};

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

HeadF.initHead = () => {
    Head.cont = document.createElement("div");
    Head.cont.className = "buttons_container";
    Head.body.insertBefore(Head.cont, document.getElementById("content_container"));
    Head.btn_labels[Head.curr_pg] = " ";
    Head.btns = [...new Array(Head.btn_labels.length)].map(e => document.createElement("div"));
    Head.btns.forEach((e, i) => {
        e.className = "buttons";
        e.innerHTML = Head.btn_labels[i];
        Head.cont.appendChild(e);
    });

}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

HeadF.clickRed = () => {
    Head.btns[0].onpointerdown = () => {
        HeadF.animRed();
    }
}

HeadF.animRed = () => {
    Head.btn_i.reverse();
    let i = 0;
    let colapse_cont = setInterval(() => {
        Head.btns[Head.btn_i[i]].animate(HeadA.anim_cont.key_f, HeadA.anim_cont.opt);
        i++;
        if (i == Head.btn_i.length) clearInterval(colapse_cont);
    }, HeadA.anim_cont.opt.duration / 4);
    if (HeadA.anim_cont.opt.direction == "normal") {
        HeadA.anim_cont.opt.direction = "reverse";
        // Head.cont.style.zIndex = "9";
    } else {
        HeadA.anim_cont.opt.direction = "normal";
        // setTimeout(() => { Head.cont.style.zIndex = "-1" }, HeadA.anim_cont.opt.duration * Head.btns.length);
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

HeadF.animLinks = () => {
    Head.link_i.forEach((e, i) => {
        if (e == Head.curr_pg) Head.btns[e].style.pointerEvents = "none";
        else {
            Head.btns[e].onpointerdown = () => {
                Head.btns[e].animate(HeadA.anim_btn.key_f, HeadA.anim_btn.opt);
                setInterval(() => {
                    DtF.destroy();
                }, randomInt(15, 60));
                if (Head.btns[e].innerText != "Z") {
                    setTimeout(() => {
                        Head.a[i].click();
                    }, 2000);
                }
            }
        }
    });
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

HeadF.animInfo = () => {
    Head.info_i.forEach(e => {
        Head.btns[e].onpointerdown = (f) => {
            Head.info_i.forEach(f => {
                Head.btns[f].animate(HeadA.anim_btn.key_f, HeadA.anim_btn.opt);
            });
            setTimeout(() => {
                Head.info.style.display = "flex";
            }, HeadA.anim_btn.opt.duration * 2);
        }
    });
}

Head.info.onpointerup = () => {
    Head.info.style.display = "none";
}