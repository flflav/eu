const Anti = {
    paths: [
        "./data/anti_0.jpg",
        "./data/anti_1.jpg",
        "./data/dollar_0.jpg",
        "./data/dollar_1.jpg",
        "./data/dollar_2.jpg",
        "./data/dollar_3.jpg",
        "./data/dollar_4.jpg",
        "./data/dollar_5.jpg",
    ],
    images: []
}

const Eq = {
    paths: [
        "./data/eq_0.jpg",
        "./data/eq_1.jpg",
        "./data/eq_2.jpg",
        "./data/eq_3.jpg",
        "./data/eq_4.jpg",
        "./data/eq_5.jpg",
        "./data/eq_6.jpg",
    ],
    images: []
}

const PreEq = {
    paths: [
        "./data/processing_0.jpg",
        "./data/processing_1.jpg",
        "./data/processing_2.jpg",
        "./data/processing_3.jpg",
        "./data/pureData_0.jpg",
        "./data/pureData_1.jpg"
    ],
    images: []
}

const Etc = {
    paths: [
        "./data/restos_0.jpg",
        "./data/restos_1.jpg",
        "./data/restos_2.jpg",
        "./data/restos_3.jpg",
        "./data/restos_4.jpg",
        "./data/restos_5.jpg",
    ],
    images: []
}

const Imgs = [
    Anti,
    Eq,
    PreEq,
    Etc
];

const Screen = {
    content_container: document.getElementById("content_container"),
    text: undefined,
    text_content: `não há nada menos 'natural' no mundo do que uma imagem … com a possível exceção do silêncio: ambos são artifícios supremos. para a consciência indiferenciada, todo o mundo sensível deve estar contínua e infinitamente repleto.`,
    rect_control: undefined,
    canvas: undefined,
    canvas_obj: undefined,
    to_screen: [],
    screen_obj: [],
    screen_pos: [],
    screen_timer: [],
    run_draw: false
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

preload = () => {
    Imgs.forEach(e => {
        e.paths.forEach(f => e.images.push(loadImage(f)));
        Screen.to_screen.push(createImage(100, 100));
        Screen.screen_pos.push(new Array(2));
    });
}

setup = () => {
    noCanvas();
    pixelDensity(1);
    Screen.canvas_obj = new SetPg();
}

draw = () => {
    if (Screen.run_draw) {
        Screen.canvas_obj.runScreen();
        Imgs.forEach((e, i) => {
            image(Screen.to_screen[i], Screen.screen_pos[i][0], Screen.screen_pos[i][1]);
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetPg {
    constructor() {
        this.initPg();
        this.initCanvas();
        this.initRect();
    }

    initPg = () => {
        Screen.text = document.createElement("div");
        Screen.text.innerHTML = Screen.text_content;
        Screen.text.className = "text";
        Screen.content_container.appendChild(Screen.text);
    }

    initCanvas = () => {
        this.container_w = Math.floor(Screen.content_container.getBoundingClientRect().width);
        this.container_h = Math.floor(Screen.content_container.getBoundingClientRect().height);
        Screen.canvas = createCanvas(this.container_w, this.container_h);
        Screen.content_container.appendChild(Screen.canvas.canvas);
        Imgs.forEach((e, i) => {
            Screen.screen_obj.push(new SetScreen(i));
        });
    }

    resetCanvas = () => {
        this.container_w = Math.floor(Screen.content_container.getBoundingClientRect().width);
        this.container_h = Math.floor(Screen.content_container.getBoundingClientRect().height);
        resizeCanvas(this.container_w, this.container_h);
    }

    initRect = () => {
        Screen.rect_control = document.createElement("div");
        Screen.rect_control.className = "control";
        Screen.content_container.appendChild(Screen.rect_control);
        Screen.rect_control.onpointerdown = () => {
            Screen.rect_control.style.opacity = "0.4";
            Screen.rect_control.style.outline = "none";
            Screen.rect_control.style.backgroundColor = "var(--white)";
            setTimeout(() => {
                Screen.rect_control.style.opacity = "1";
                Screen.rect_control.style.outline = "4px solid var(--black)";
                Screen.rect_control.style.backgroundColor = "rgba(0, 0, 0, 0)"; 
            }, 400);
            Screen.run_draw = !Screen.run_draw;
        };
    }

    runScreen = () => {
        Imgs.forEach((e, i) => {
            Screen.screen_obj[i].setIndex();
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetScreen {
    constructor(index) {
        this.Val = {
            index: index,
            image: undefined,
            pix_index: [],
            lim_matrix: [10, 80],
            matrix: undefined,
            lim_timer: [5000, 10000],
            alpha_order: [255, 0],
            alpha_thresh: 125
        }
        this.setVal();
        this.setTimer();
    }

    setVal = () => {
        this.rand_img = randomInt(0, Imgs[this.Val.index].images.length);
        this.Val.image = Imgs[this.Val.index].images[this.rand_img];
        this.Val.image.loadPixels();
        this.Val.pix_index.push(randomInt(0, this.Val.image.width));
        this.Val.pix_index.push(randomInt(0, this.Val.image.height));
        this.Val.matrix = randomInt(this.Val.lim_matrix[0], this.Val.lim_matrix[1]);
        Screen.to_screen[this.Val.index].resize(this.Val.image.width, this.Val.image.height);
        Screen.screen_pos[this.Val.index][0] = randomInt(0 - this.Val.image.width / 2, this.Val.image.width + this.Val.image.width / 2);
        Screen.screen_pos[this.Val.index][1] = randomInt(0 - this.Val.image.height / 2, this.Val.image.height + this.Val.image.height / 2);
    }

    setTimer = () => {
        this.timer = randomInt(this.Val.lim_timer[0], this.Val.lim_timer[1]);
        setTimeout(() => {
            this.Val.alpha_thresh = randomInt(50, 200);
            this.rand_order = randomInt(0, 2);
            if (this.rand_order == 0) this.Val.alpha_order = [255, 0];
            else this.Val.alpha_order = [0, 255];
            this.setVal();
            this.setTimer();
        }, this.timer);
    }

    setIndex = () => {
        Screen.to_screen[this.Val.index].loadPixels();
        this.Val.pix_index = this.getPos();
        this.setPixels();
        Screen.to_screen[this.Val.index].updatePixels();
    }

    getPos = () => {
        this.p = [];
        this.x = this.Val.pix_index[0];
        this.y = this.Val.pix_index[1];
        this.p.push(constrainVal(this.x + randomInt(-this.Val.matrix, this.Val.matrix), 0, this.Val.image.width - 1));
        this.p.push(constrainVal(this.y + randomInt(-this.Val.matrix, this.Val.matrix), 0, this.Val.image.height - 1));
        return this.p;
    }

    setPixels = () => {
        this.x = this.Val.pix_index[0];
        this.y = this.Val.pix_index[1];
        for (this.y_ = -this.Val.matrix; this.y_ <= this.Val.matrix; this.y_++) {
            for (this.x_ = -this.Val.matrix; this.x_ <= this.Val.matrix; this.x_++) {
                this. index = constrainVal((this.y_ + this.y) * this.Val.image.width + (this.x_ + this.x), 0, this.Val.image.width * this.Val.image.height - this.Val.matrix) * 4;
                this.r = this.Val.image.pixels[this.index + 0];
                this.g = this.Val.image.pixels[this.index + 1];
                this.b = this.Val.image.pixels[this.index + 2];
                this.a = ((this.r + this.g + this.b) / 3 > this.Val.alpha_thresh) ? this.Val.alpha_order[0] : this.Val.alpha_order[1];
                Screen.to_screen[this.Val.index].pixels[this.index + 0] = this.Val.image.pixels[this.index + 0];
                Screen.to_screen[this.Val.index].pixels[this.index + 1] = this.Val.image.pixels[this.index + 1];
                Screen.to_screen[this.Val.index].pixels[this.index + 2] = this.Val.image.pixels[this.index + 2];
                Screen.to_screen[this.Val.index].pixels[this.index + 3] = this.a;
            }   
        }
    }
}