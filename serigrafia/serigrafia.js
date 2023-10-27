const Data = {
    paths: [
        [
            "./serigrafia/data/A+/colares.jpg",
            "./serigrafia/data/A+/conchas.jpg",
            "./serigrafia/data/A+/escamas.jpg"
        ],
        [
            "./serigrafia/data/A1/pilar.jpg",
            "./serigrafia/data/A1/corrosao.jpg",
            "./serigrafia/data/A1/difusao.jpg",
            "./serigrafia/data/A1/colunas.jpg"
        ],
        [
            "./serigrafia/data/A2/hijikata.jpg",
            "./serigrafia/data/A2/disco.jpg",
            "./serigrafia/data/A2/grade.jpg",
        ],
        [
            "./serigrafia/data/A3/arbus.jpg",
            "./serigrafia/data/A3/divisao.jpg",
            "./serigrafia/data/A3/quadrado.jpg",
            "./serigrafia/data/A3/escorrer.jpg",
            "./serigrafia/data/A3/dollar.jpg"
        ]
    ],
    ctg: [
        "A+",
        "A1",
        "A2",
        "A3"
    ],
    txt: [
        [
            `[A+ - 0] <br>
            viscolinho <br>
            1.03 x 1.50m <br>
            branco preto`,
            `[A+ - 1] <br>
            viscolinho <br>
            1.00 x 1.52m <br>
            amarelo vermelho`,
            `[A+ - 2] <br>
            viscolinho <br>
            0.98 x 1.53m <br>
            roxo azul`
        ],
        [
            `[A1 - 0] <br>
            papel color plus <br>
            laranja vermelho`,
            `[A1 - 1] <br>
            papel color plus <br>
            preto branco <br>
            laranja vermelho`,
            `[A1 - 2] <br>
            papel color plus <br>
            branco vermelho <br>
            roxo azul <br>
            laranja azul <br>
            azul preto <br>
            rosa azul`,
            `[A1 - 2] <br>
            papel pergamenata <br>
            branco preto vermelho`
        ],
        [
            `[A2 - 0] <br>
            tatsumi hijikata <br>
            papel color plus <br>
            branco preto`,
            `[A2 - 1] <br>
            papel color plus <br>
            azul vermelho <br>
            branco laranja`,
            `[A2 - 2] <br>
            papel color plus <br>
            branco preto <br>
            [A3] <br>
            preto branco <br>
            branco vermelho <br>
            laranja vermelho`
        ],
        [
            `[A3 - 0] <br>
            diane arbus <br>
            papel color plus <br>
            branco vermelho <br>
            laranja azul <br>
            azul claro azul escuro <br>
            rosa azul <br>
            rosa preto <br>
            [A2] <br>
            branco preto`,
            `[A3 - 1] <br>
            papel color plus <br>
            laranja azul branco <br>
            laranja branco azul`,
            `[A3 - 2] <br>
            papel color plus <br>
            amarelo azul <br>
            azul vermelho <br>
            azul preto`,
            `[A3 - 3] <br>
            papel color plus <br>
            branco preto <br>
            laranja vermelho <br>
            branco laranja <br>
            vermelho preto`,
            `[A3 - 4] <br>
            dollar general <br>
            papel color plus <br>
            branco azul laranja preto`
        ]
    ]
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const Seri = {
    cont: document.getElementById("content_container"),
    ctg_labels: ["A+", "A1", "A2", "A3"],
    num_ctg: undefined,
    ctg: [],
    gal_cover: undefined,
    gal_cont: undefined,
    imgs: [[], [], [], []],
    zoom_cont: undefined,
    zoom_img: undefined,
    zoom_info: undefined,
    zoom_btn: undefined
}

const SeriA = {
    anim_ctg: {
        temp_opacity: "",
        key_f: [
            {
                opacity: undefined,
            },
            {
                opacity: "1.0"
            }
        ],
        opt: {
            duration: 300,
            easing: "step-start"
        }
    },
}

const SeriF = {};

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

Seri.num_ctg = Seri.ctg_labels.length * 20;

SeriF.initSeri = () => {
    let c = 0;
    let i = 0;
    while (i < Seri.num_ctg) {
        Seri.ctg.push(document.createElement("div"));
        Seri.ctg[i].className = "category";
        Seri.ctg[i].innerHTML = Seri.ctg_labels[c];
        Seri.ctg[i].style.opacity = `${randomFloat(0.2, 0.8)}`;
        Seri.cont.appendChild(Seri.ctg[i]);
        c++
        if (c == Seri.ctg_labels.length) c = 0;
        i++;
    }
}

SeriF.initGal = () => {
    Seri.gal_cover = document.createElement("div");
    Seri.gal_cover.className = "gallery_cover";
    Head.body.appendChild(Seri.gal_cover);
    Seri.gal_cont = document.createElement("div");
    Seri.gal_cont.className = "gallery_container";
    Head.body.appendChild(Seri.gal_cont);
}

SeriF.initZoom = () => {
    Seri.zoom_cont = document.createElement("div");
    Seri.zoom_cont.className = "zoom_container";
    Head.body.appendChild(Seri.zoom_cont);
    Seri.zoom_info = document.createElement("div");
    Seri.zoom_info.className = "zoom_info";
    Seri.zoom_cont.appendChild(Seri.zoom_info);
    Seri.zoom_img = document.createElement("img");
    Seri.zoom_cont.appendChild(Seri.zoom_img);
    Seri.zoom_btn = document.createElement("div");
    Seri.zoom_btn.className = "zoom_button";
    Head.body.appendChild(Seri.zoom_btn);
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

SeriF.clickCtg = () => {
    Seri.ctg.forEach(e => {
        e.onpointerup = (f) => {
            let st = window.getComputedStyle(e);
            SeriA.anim_ctg.key_f[0].opacity = st.getPropertyValue("opacity");
            e.animate(SeriA.anim_ctg.key_f, SeriA.anim_ctg.opt);
            setTimeout(() => {
                let gal_rect = Seri.gal_cont.getBoundingClientRect();
                if (f.pageX < window.innerWidth / 2) Seri.gal_cont.style.left = `${f.pageX - gal_rect.width * 0.25}px`;
                else Seri.gal_cont.style.left = `${f.pageX - gal_rect.width * 0.75}px`;
                Seri.gal_cont.style.top = `${f.pageY}px`;
                SeriF.openGal(Data.ctg.indexOf(e.innerHTML));
            }, SeriA.anim_ctg.opt.duration);
        }
    });
}

SeriF.openGal = (idx) => {
    Seri.gal_cover.style.display = "block";
    SeriF.loadImg(idx, 0);
    Seri.gal_cover.onpointerup = () => {
        Seri.imgs[idx] = [];
        while (Seri.gal_cont.firstChild) Seri.gal_cont.removeChild(Seri.gal_cont.lastChild);
        Seri.gal_cover.style.display = "none";
    }
}

SeriF.loadImg = (idx, data_i) => {
    if (data_i == Data.paths[idx].length) {
        Seri.imgs.forEach((e, i) => {
            e.forEach((f, j) => {
                f.onpointerup = () => {
                    SeriF.openZoom(f, i, j);
                }
            });
        });
    } else {
        Seri.imgs[idx].push(document.createElement("img"));
        Seri.imgs[idx][data_i].src = Data.paths[idx][data_i];
        Seri.imgs[idx][data_i].onload = () => {
            Seri.gal_cont.appendChild(Seri.imgs[idx][data_i]);
            data_i++;
            setTimeout(() => { SeriF.loadImg(idx, data_i) }, 100);
        }
    }
    
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

SeriF.openZoom = (img, ctg_i, img_i) => {
    Seri.zoom_cont.style.display = "flex";
    Seri.zoom_cont.onpointerup = () => {
        Seri.zoom_img.style.display = "block";
        Seri.zoom_cont.style.display = "none";
        Seri.zoom_btn.style.display = "none";
    }
    Seri.zoom_info.innerHTML = Data.txt[ctg_i][img_i];
    Seri.zoom_img.src = img.src;
    Seri.zoom_btn.style.display = "block";
    Seri.zoom_btn.onpointerup = () => {
        let st = window.getComputedStyle(Seri.zoom_img);
        let dsp = st.getPropertyValue("display");
        if (dsp != "none") Seri.zoom_img.style.display = "none";
        else Seri.zoom_img.style.display = "block";
    }
    
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

SeriF.initSeri();
SeriF.initGal();
SeriF.initZoom();
SeriF.clickCtg();