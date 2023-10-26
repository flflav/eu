const MoveD = {
    title: `SEM TÍTULO`,
    txt: `... e sem procedência 2021 <br>
    imagens aleatórias da internet <br>
    coletadas através de termos banais <br>
    como férias <br>
    bunda <br>
    dinheiro <br>
    ... <br>
    pixels de cada imagem ordenados por cor <br>
    de onde se tiram correspondências <br>
    e o movimento entre suas posições <br>
    (resumido e determinado para a internet)`,
    bckg: `movePixels = (index, sel_img) => {
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
    
    }`,
    img_paths: [
        "./codigo/data/move_0.jpg",
        "./codigo/data/move_1.jpg",
        "./codigo/data/move_2.jpg",
        "./codigo/data/move_3.jpg",
        "./codigo/data/move_4.jpg",
        "./codigo/data/move_5.jpg"
    ]
}

const Move = {
    inst: undefined,
    imgs: [],
    to_screen: undefined,
    is_moving: false,
    cnv_cont: undefined,
    cnv: undefined,
    cnv_bckg: undefined,
    txt_cont: undefined,
    txt_title: undefined,
    fullscreen: undefined,
    txt: undefined,
    color_idx: [],
    lim_mov: 0,
    lim_mov_rt: randomInt(500, 1000),
    sel_img: 0,
    sel_timer: true
}

const MoveF = {};

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

MoveF.initPg = () => {
    Move.item_cont = document.createElement("div");
    Move.item_cont.className = "item_container";
    document.getElementById("content_container").appendChild(Move.item_cont);
    Move.cnv_cont = document.createElement("div");
    Move.cnv_cont.className = "canvas_container";
    Move.item_cont.appendChild(Move.cnv_cont);
    Move.cnv_bckg = document.createElement("div");
    Move.cnv_bckg.className = "canvas_background";
    Move.cnv_bckg.innerHTML = MoveD.bckg;
    Move.cnv_cont.appendChild(Move.cnv_bckg);
    Move.txt_cont = document.createElement("div");
    Move.txt_cont.className = "text";
    Move.item_cont.appendChild(Move.txt_cont);
    Move.txt_title = document.createElement("div");
    Move.txt_title.className = "text_title";
    Move.txt_title.innerHTML = MoveD.title;
    Move.txt_cont.appendChild(Move.txt_title);
    Move.fullscreen = document.createElement("div");
    Move.fullscreen.className = "fullscreen";
    Move.txt_title.appendChild(Move.fullscreen);
    Move.txt = document.createElement("div");
    Move.txt.className = "text";
    Move.txt.innerHTML = MoveD.txt;
    Move.txt_cont.appendChild(Move.txt);
}

MoveF.initCanvas = () => {
    let cnv_sz = Math.floor(MoveF.canvasSz());
    Move.cnv = Move.inst.createCanvas(cnv_sz, cnv_sz);
    Move.cnv_cont.appendChild(Move.cnv.canvas);
    Move.cnv_bckg.style.width = `${cnv_sz}px`;
    Move.cnv_bckg.style.height = `${cnv_sz}px`;
}

MoveF.resizeCnv = () => {
    let cnv_sz = Math.floor(MoveF.canvasSz());
    Move.cnv = Move.inst.resizeCanvas(cnv_sz, cnv_sz);
    Move.cnv_bckg.style.width = `${cnv_sz}px`;
    Move.cnv_bckg.style.height = `${cnv_sz}px`;
}

MoveF.canvasSz = () => {
    if (window.innerWidth < window.innerHeight) {
        if (window.innerWidth < 820) return window.innerWidth * 0.8;
        else return 720;
    } else {
        if (window.innerHeight < 820) return window.innerHeight * 0.8;
        else return 720;
    }
}

MoveF.clickCnv = () => {
    Move.cnv.canvas.onpointerdown = () => {
        Move.is_moving = !Move.is_moving;
        if (Move.is_moving) Move.inst.loop();
        else Move.inst.noLoop();
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

MoveF.sortPixels = () => {
    Move.imgs.forEach(e => {
        let temp = [];
        e.loadPixels();
        let i = 0;
        while (i < e.pixels.length) {
            temp.push([
                i,
                e.pixels[i],
                e.pixels[i + 1],
                e.pixels[i + 2]
            ]);
            i += 4;
        }
        temp.sort((a, b) => {
            let c_a = (a[1] + a[2] + a[3]) / 3;
            let c_b = (b[1] + b[2] + b[3]) / 3;
            if (c_a < c_b) return -1;
            else if (c_a > c_b) return 1;
            return 0;
        });
        Move.color_idx.push(temp);
    });
}

MoveF.drawImage = () => {
    Move.to_screen.loadPixels();
    Move.color_idx[0].forEach(e => {
        Move.to_screen.pixels[e[0]] = e[1];
        Move.to_screen.pixels[e[0] + 1] = e[2];
        Move.to_screen.pixels[e[0] + 2] = e[3];
        Move.to_screen.pixels[e[0] + 3] = 255;
    });
    Move.to_screen.updatePixels();
}

MoveF.controlMovement = () => {
    if (Move.sel_timer) {
        if (Move.lim_mov == 0) {
            setTimeout(() => {
                Move.lim_mov = 0;
                Move.lim_mov_rt = randomInt(200, 800);
                if (Move.sel_img < Move.imgs.length - 3) Move.sel_img++;
                else {
                    Move.sel_img++;
                    Move.sel_timer = false;
                }
            }, randomInt(20000, 30000));
        }
    }
    let i = 0;
    while (i < Move.color_idx[0].length) {
        if (i < Move.lim_mov) MoveF.movePixels(i, Move.sel_img + 1);
        else if (Move.sel_img != 0) MoveF.movePixels(i, Move.sel_img);
        i++;
    }
    Move.lim_mov += Move.lim_mov_rt;
}

MoveF.movePixels = (index, sel_img) => {
    let index_from = Move.color_idx[0][index][0];
    let index_to = Move.color_idx[sel_img][index][0];
    let x_from = (index_from / 4) % Move.to_screen.width;
    let y_from = Math.floor((index_from / 4) / Move.to_screen.width);
    let x_to = (index_to / 4) % Move.to_screen.width;
    let t_to = Math.floor((index_to / 4) / Move.to_screen.width);
    let random_direction = Math.random();
    if (random_direction < 0.5) {
        if (x_from < x_to) x_from++;
        else x_from--;
    } else {
        if (y_from < t_to) y_from++;
        else y_from--;
    }
    Move.color_idx[0][index][0] = (y_from * Move.to_screen.width + x_from) * 4;
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const move_inst = new p5((move) => {
    move.preload = () => {
        MoveD.img_paths.forEach(e => {
            Move.imgs.push(move.loadImage(e));
        });
        Move.to_screen = move.createImage(200, 200);
    }

    move.setup = () => {
        move.pixelDensity(1);
        move.frameRate(15);
        MoveF.initPg();
        Move.inst = move;
        MoveF.initCanvas();
        MoveF.sortPixels();
        MoveF.clickCnv();
    }

    move.draw = () => {
        if (Move.is_moving) {
            MoveF.controlMovement();
            MoveF.drawImage();
        }
        move.image(Move.to_screen, 0, 0, move.width, move.height);
    }
});