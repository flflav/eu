const moveTitle = `SEM TÍTULO`;
const moveText = `... e sem procedência 2021 <br>
imagens aleatórias da internet <br>
coletadas através de termos banais <br>
como férias <br>
bunda <br>
dinheiro <br>
... <br>
pixels de cada imagem ordenados por cor <br>
de onde se tiram correspondências <br>
e o movimento entre suas posições <br>
(resumido e determinado para a internet)`;
const moveBackground = `movePixels = (index, sel_img) => {
    this.index_from = ImgMove.color_index[0][index][0];
    this.index_to = ImgMove.color_index[sel_img][index][0];
    this.x_from = (this.index_from / 4) % ImgMove.to_screen.width;
    this.y_from = Math.floor((this.index_from / 4) / ImgMove.to_screen.width);
    this.x_to = (this.index_to / 4) % ImgMove.to_screen.width;
    this.t_to = Math.floor((this.index_to / 4) / ImgMove.to_screen.width);
    this.random_direction = Math.random();
    if (this.random_direction < 0.5) {
        if (this.x_from < this.x_to) this.x_from++;
        else this.x_from--;
    } else {
        if (this.y_from < this.t_to) this.y_from++;
        else this.y_from--;
    }
    ImgMove.color_index[0][index][0] = (this.y_from * ImgMove.to_screen.width + this.x_from) * 4;
}

controlMovement = () => {
    if (this.sel_timer) {
        if (this.limit_movement == 0) {
            setTimeout(() => {
                this.limit_movement = 0;
                this.limit_movement_rate = randomInt(500, 1000);
                if (this.sel_img < ImgMove.imgs.length - 3) this.sel_img++;
                else {
                    this.sel_img++;
                    this.sel_timer = false;
                }
            }, randomInt(30000, 50000));
        }
    }
    this.i = 0;
    while (this.i < ImgMove.color_index[0].length) {
        if (this.i < this.limit_movement) this.movePixels(this.i, this.sel_img + 1);
        else if (this.sel_img != 0) this.movePixels(this.i, this.sel_img);
        this.i++;
    }
    this.limit_movement += this.limit_movement_rate;

}`;

const ImgMove = {
    paths: new Array(
        "./codigo/data/move_0.png",
        "./codigo/data/move_1.png",
        "./codigo/data/move_2.png",
        "./codigo/data/move_3.png",
        "./codigo/data/move_4.png",
        "./codigo/data/move_5.png"
    ),
    imgs: [],
    to_screen: [],
    color_index: [],
    isMoving: false
}

const ElementsMove = {
    content_container: document.getElementById("content_container"),
    item: undefined,
    canvas_container: undefined,
    canvas: undefined,
    canvas_background: undefined,
    text_container: undefined,
    fullscreen: undefined,
    text: undefined
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//


const moveInstance = new p5((move) => {
    move.preload = () => {
        ImgMove.paths.forEach((e) => {
            ImgMove.imgs.push(move.loadImage(e));
        });
        ImgMove.to_screen = move.createImage(500, 500);     
    }

    move.setup = () => {
        move.pixelDensity(1);
        move.frameRate(15);
        move.set_canvas = new SetCanvasMove(move);
        move.noLoop();
        move.set_pixels = new SetPixels();
    }

    move.draw = () => {
        if (ImgMove.isMoving) {
            move.set_pixels.controlMovement();
            move.set_pixels.drawImage();
        }
        move.image(ImgMove.to_screen, 0, 0, move.width, move.height);
    }


});

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetCanvasMove {
    constructor(instance) {
        this.instance = instance;
        this.setHtml();   
        this.setClicks();
    }

    setHtml = () => {
        ElementsMove.item = document.createElement("div");
        ElementsMove.item.className = "item";
        ElementsMove.content_container.appendChild(ElementsMove.item);
        ElementsMove.canvas_container = document.createElement("div");
        ElementsMove.canvas_container.className = "canvas_container";
        ElementsMove.item.appendChild(ElementsMove.canvas_container);
        ElementsMove.canvas_background = document.createElement("div");
        ElementsMove.canvas_background.className = "code_background";
        ElementsMove.canvas_background.innerHTML = moveBackground;
        ElementsMove.canvas_container.appendChild(ElementsMove.canvas_background);
        ElementsMove.text_container = document.createElement("div");
        ElementsMove.text_container.className = "text";
        ElementsMove.item.appendChild(ElementsMove.text_container);
        ElementsMove.textTitle = document.createElement("div");
        ElementsMove.textTitle.className = "text_title";
        ElementsMove.textTitle.innerHTML = moveTitle;
        ElementsMove.text_container.appendChild(ElementsMove.textTitle);
        ElementsMove.fullscreen = document.createElement("div");
        ElementsMove.fullscreen.className = "fullscreen";
        ElementsMove.textTitle.appendChild(ElementsMove.fullscreen);
        ElementsMove.text = document.createElement("div");
        ElementsMove.text.className = "text";
        ElementsMove.text.innerHTML = moveText;
        ElementsMove.text_container.appendChild(ElementsMove.text);    
        this.initCanvas();
    }

    initCanvas = () => {
        this.canvas_sz = Math.floor(this.canvasSize());
        ElementsMove.canvas = this.instance.createCanvas(this.canvas_sz, this.canvas_sz).class("code_canvas");
        ElementsMove.canvas_background.style.width = `${this.canvas_sz}px`;
        ElementsMove.canvas_background.style.height = `${this.canvas_sz}px`;
        ElementsMove.canvas_container.appendChild(ElementsMove.canvas.canvas);
        pg_loaded++;
        if (pg_loaded == 2) removeLogo();

    }

    resetCanvas = () => {
        this.canvas_sz = Math.floor(this.canvasSize());
        this.instance.resizeCanvas(this.canvas_sz, this.canvas_sz);
        ElementsMove.canvas_background.style.width = `${this.canvas_sz}px`;
        ElementsMove.canvas_background.style.height = `${this.canvas_sz}px`;
    }

    canvasSize = () => {
        if (window.innerWidth < window.innerHeight) {
            if (window.innerWidth <= 820) return window.innerWidth * 0.8;
            else return 720;
        } else {
            if (window.innerHeight <= 820) return window.innerHeight * 0.8;
            else return 720;
        }
    }

    setClicks = () => {
        ElementsMove.canvas.canvas.addEventListener("pointerdown", () => {
            ImgMove.isMoving = !ImgMove.isMoving;
            if (ImgMove.isMoving) this.instance.loop();
            else this.instance.noLoop();
        });
        ElementsMove.fullscreen.addEventListener("pointerdown", () => {
            ElementsMove.canvas.canvas.requestFullscreen();
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetPixels {
    constructor() {
        this.setRegister();
        this.limit_movement = 0;
        this.limit_movement_rate = randomInt(500, 1000);
        this.sel_img = 0;
        this.sel_timer = true;
    }

    setRegister = () => {
        ImgMove.imgs.forEach((e) => {
            this.temp = [];
            e.loadPixels();
            this.i = 0;
            while (this.i < e.pixels.length) {
                this.temp.push([
                    this.i,
                    e.pixels[this.i + 0],
                    e.pixels[this.i + 1],
                    e.pixels[this.i + 2]
                ]);
                this.i += 4;
            }
            this.temp.sort((a, b) => {
                this.cA = (a[1] + a[2] + a[3]) / 3;
                this.cB = (b[1] + b[2] + b[3]) / 3;
                if (this.cA < this.cB) return -1;
                else if (this.cA > this.cB) return 1;
                return 0;
            });
            ImgMove.color_index.push(this.temp);
        });
    }

    drawImage = () => {
        ImgMove.to_screen.loadPixels();
        ImgMove.color_index[0].forEach((e) => {
            ImgMove.to_screen.pixels[e[0] + 0] = e[1];
            ImgMove.to_screen.pixels[e[0] + 1] = e[2];
            ImgMove.to_screen.pixels[e[0] + 2] = e[3];
            ImgMove.to_screen.pixels[e[0] + 3] = 255;
        });
        ImgMove.to_screen.updatePixels();
    }

    controlMovement = () => {
        if (this.sel_timer) {
            if (this.limit_movement == 0) {
                setTimeout(() => {
                    this.limit_movement = 0;
                    this.limit_movement_rate = randomInt(500, 1000);
                    if (this.sel_img < ImgMove.imgs.length - 3) this.sel_img++;
                    else {
                        this.sel_img++;
                        this.sel_timer = false;
                    }
                }, randomInt(30000, 50000));
            }
        }
        this.i = 0;
        while (this.i < ImgMove.color_index[0].length) {
            if (this.i < this.limit_movement) this.movePixels(this.i, this.sel_img + 1);
            else if (this.sel_img != 0) this.movePixels(this.i, this.sel_img);
            this.i++;
        }
        this.limit_movement += this.limit_movement_rate;

    }

    movePixels = (index, sel_img) => {
        this.index_from = ImgMove.color_index[0][index][0];
        this.index_to = ImgMove.color_index[sel_img][index][0];
        this.x_from = (this.index_from / 4) % ImgMove.to_screen.width;
        this.y_from = Math.floor((this.index_from / 4) / ImgMove.to_screen.width);
        this.x_to = (this.index_to / 4) % ImgMove.to_screen.width;
        this.t_to = Math.floor((this.index_to / 4) / ImgMove.to_screen.width);
        this.random_direction = Math.random();
        if (this.random_direction < 0.5) {
            if (this.x_from < this.x_to) this.x_from++;
            else this.x_from--;
        } else {
            if (this.y_from < this.t_to) this.y_from++;
            else this.y_from--;
        }
        ImgMove.color_index[0][index][0] = (this.y_from * ImgMove.to_screen.width + this.x_from) * 4;
    }
}