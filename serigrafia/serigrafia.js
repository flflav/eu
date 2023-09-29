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
    sizes: [
        "A+",
        "A1",
        "A2",
        "A3"
    ],
    descriptions: [
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

const Menu = {
    body: document.getElementsByTagName("body")[0],
    container: document.getElementById("content_container"),
    sections: []
}

const Zoom = {
    container: undefined,
    image: undefined,
    isOpen: false
}

const Info = {
    container: undefined,
    description: undefined,
    isOpen: false
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetMenu {
    constructor() {
        this.Keyframes = {
            colorSection: undefined
        }
        this.Options = {
            duration: 300,
            fill: "forwards",
            easing: "step-start",
            direction: "reverse"
        }
        this.gallery_objs = [];
        this.initMenu();
        this.initGallery();
        this.initInfo();
        this.initZoom();
        this.setKeyframes();
        this.clickSection();
    }

    initMenu = () => {
        Data.sizes.forEach(e => {
            Menu.sections.push(document.createElement("div"));
            Menu.sections.at(-1).className = "menu_sections";
            Menu.sections.at(-1).innerHTML = e;
            Menu.container.appendChild(Menu.sections.at(-1));
        });
    }

    initGallery = () => {
        Menu.sections.forEach((e, i) => this.gallery_objs.push(new SetGallery(i)));
    }

    initInfo = () => {
        Info.container = document.createElement("div");
        Info.container.className = "info_container";
        Menu.body.appendChild(Info.container);
        Info.description = document.createElement("div");
        Info.description.className = "info_description";
        Info.container.appendChild(Info.description);
    }

    initZoom = () => {
        Zoom.container = document.createElement("div");
        Zoom.container.className = "zoom_container";
        Menu.body.appendChild(Zoom.container);
        Zoom.image = document.createElement("img");
        Zoom.container.appendChild(Zoom.image);
    }

    setKeyframes = () => {
        this.Keyframes.colorSection = [
            {
                color: "var(--black)",
                borderBottom: "2vmax solid var(--black)"
            },
            {
                color: "var(--red)",
                borderBottom: "2vmax solid var(--red)"
            }
        ];
    }

    clickSection = () => {
        Menu.sections.forEach((e, i) => {
            e.onpointerdown = () => {
                this.animateSection(e, i);
            }
        });
    }

    animateSection = (section, index) => {
        section.animate(this.Keyframes.colorSection, this.Options);
        setTimeout(() => {
            this.close = undefined;
            this.gallery_objs.forEach((e, i) => { if (i != index && e.isOpen) this.close = e });
            if (this.close == undefined) this.gallery_objs[index].animateGallery();
            else {
                this.close.animateGallery();
                setTimeout(() => { this.gallery_objs[index].animateGallery() }, this.close.Options.duration);
            }
        }, this.Options.duration);
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetGallery {
    constructor(index) {
        this.index = index;
        this.Gallery = {
            container: undefined,
            menu: undefined,
            button_containers: [],
            buttons: [],
            gallery: undefined,
            images: []
        }
        this.Keyframes = {
            openGallery: undefined,
            clickButton: [{ border: "5px solid var(--black)" }, { border: "5px solid var(--red)" }]
        }
        this.Options = {
            duration: 1500,
            fill: "forwards",
            easing: "ease-in-out",
            direction: "normal"
        }
        this.ButtonOptions = {
            duration: 300,
            fill: "forwards",
            easing: "step-start",
            direction: "reverse"
        }
        this.isOpen = false;
        this.initImages();
    }

    initImages = () => {
        this.loadImages(0);
    }

    loadImages = (img_index) => {
        if (img_index == Data.paths[this.index].length) {
            setTimeout(() => {
                document.getElementById("cover").style.display = "none";
            }, 2000);
            this.initGallery();
            return;
        } else {
            this.Gallery.images.push(document.createElement("img"));
            this.Gallery.images[img_index].src = Data.paths[this.index][img_index];
            this.Gallery.images[img_index].setAttribute("draggable", false);
            this.Gallery.images[img_index].onload = () => {
                img_index++;
                this.loadImages(img_index);
            }
        }
    }

    initGallery = () => {
        this.Gallery.container = document.createElement("div");
        this.Gallery.container.className = "gallery_container";
        Menu.container.insertBefore(this.Gallery.container, Menu.sections[this.index + 1]);
        this.Gallery.menu = document.createElement("div");
        this.Gallery.menu.className = "gallery_menu";
        this.Gallery.container.appendChild(this.Gallery.menu);
        this.Gallery.gallery = document.createElement("div");
        this.Gallery.gallery.className = "gallery_gallery";
        this.Gallery.container.appendChild(this.Gallery.gallery);
        this.loadGallery();
    }

    loadGallery = () => {
        this.Gallery.images.forEach(e => {
            this.Gallery.gallery.appendChild(e);
            this.style = window.getComputedStyle(e);
            this.h = this.style.getPropertyValue("height");
            this.Gallery.button_containers.push(document.createElement("div"));
            this.Gallery.button_containers.at(-1).className = "gallery_button_container";
            this.Gallery.menu.appendChild(this.Gallery.button_containers.at(-1));
            this.Gallery.button_containers.at(-1).style.height = `${this.h}`;
            this.Gallery.buttons.push(document.createElement("div"));
            this.Gallery.buttons.at(-1).className = "gallery_button";
            this.Gallery.button_containers.at(-1).appendChild(this.Gallery.buttons.at(-1));
            this.clickButton();
            this.clickImage();
        });
        removeLogo();
    }

    animateGallery = () => {
        if (!this.isOpen) this.openGallery();
        else this.closeGallery();
    }

    openGallery = () => {
        this.isOpen = true;
        this.style = window.getComputedStyle(this.Gallery.gallery);
        this.h = this.style.getPropertyValue("height");
        this.Keyframes.openGallery = [{ height: "0" }, { height: `${this.h}` }];
        this.Gallery.container.animate(this.Keyframes.openGallery, this.Options);
        setTimeout(() => { colorImage() }, this.Options.duration);
    }

    closeGallery = () => {
        this.isOpen = false;
        this.style = window.getComputedStyle(this.Gallery.container);
        this.h = this.style.getPropertyValue("height");
        this.Keyframes.openGallery = [{ height: `${this.h}` }, { height: "0" }];
        this.Gallery.container.animate(this.Keyframes.openGallery, this.Options);
    }

    clickButton = () => {
        this.Gallery.buttons.forEach((e, i) => {
            e.onpointerdown = () => {
                this.animateButton(e, i);
            }
        });
    }

    animateButton = (button, index) => {
        button.animate(this.Keyframes.clickButton, this.ButtonOptions);
        setTimeout(() => { this.openInfo(index) }, this.ButtonOptions.duration);
    }

    openInfo = (index) => {
        Info.container.style.display = "block";
        Info.description.style.display = "flex";
        Info.isOpen = true;
        Info.description.innerHTML = Data.descriptions[this.index][index];
        if (Info.isOpen) {
            document.onpointerdown = () => {
                Info.container.style.display = "none";
                Info.description.style.display = "none";
                Info.isOpen = false;
            }
        }
    }

    clickImage = () => {
        this.Gallery.images.forEach(e => {
            e.onpointerup = () => { this.openZoom(e) };
        });
        this.closeZoom();
    }

    openZoom = (img) => {
        Zoom.container.style.display = "flex";
        Zoom.image.src = img.src;
        Zoom.image.style.filter = "none";
        this.imageRect = img.getBoundingClientRect();
        this.wDiff = Math.abs(window.innerWidth - this.imageRect.width);
        this.hDiff = Math.abs(window.innerHeight - this.imageRect.height);
        if (this.wDiff < this.hDiff) {
            Zoom.image.style.width = "90vw";
            Zoom.image.style.height = "auto";
        } else {
            Zoom.image.style.width = "auto";
            Zoom.image.style.height = "90vh";
        }
        Zoom.isOpen = true;
    }

    closeZoom = () => {
        Zoom.container.onpointerup = () => {
            Zoom.container.style.display = "none";
            Zoom.image.src = "";
        }
        Zoom.isOpen = false;
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const setMenu = new SetMenu();
let inFocus = undefined;

function colorImage() { 
    let elt = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    if (elt.tagName == "IMG") {
        if (inFocus != undefined && elt.src != inFocus.src) {
            elt.style.filter = "none";
            inFocus.style.filter = "grayscale(100%)";
            inFocus = elt;
        } else {
            elt.style.filter = "none";
            inFocus = elt;
        }
    }
}