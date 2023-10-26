const Data = {
    paths: [
        "./imagem/data/eq_0.jpg",
        "./imagem/data/eq_1.jpg",
        "./imagem/data/eq_2.jpg",
        "./imagem/data/eq_3.jpg",
        "./imagem/data/eq_4.jpg",
        "./imagem/data/eq_5.jpg",
        "./imagem/data/eq_6.jpg",
        "./imagem/data/eq_7.jpg",
        "./imagem/data/eq_8.jpg",
        "./imagem/data/processing_0.jpg",
        "./imagem/data/processing_1.jpg",
        "./imagem/data/processing_2.jpg",
        "./imagem/data/processing_3.jpg",
        "./imagem/data/pureData_0.jpg",
        "./imagem/data/pureData_1.jpg",
        "./imagem/data/restos_0.jpg",
        "./imagem/data/restos_1.jpg",
        "./imagem/data/restos_2.jpg",
        "./imagem/data/restos_3.jpg",
        "./imagem/data/restos_4.jpg",
        "./imagem/data/restos_5.jpg",
    ],
    imgs: []
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const Img = {
    cont: document.getElementById("content_container"),
    gal_cont: undefined,
    num_bckg: 10,
    num_col: 60,
    num_row: 500,
    rows: [],
    sqrs: [],
    is_drawing: false,
    idx_order: [],
    draw_obj: []
}

const ImgF = {}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

ImgF.initImg = () => {
    Img.gal_cont = document.createElement("div");
    Img.gal_cont.className = "gallery_container";
    Img.cont.appendChild(Img.gal_cont);
    Img.idx_order = Array.from({ length: Img.num_col * Img.num_col }, (e, i) => i);
}

ImgF.initGal = () => {
    let i = 0;
    while (i < Img.num_row) {
        Img.rows.push(document.createElement("div"));
        Img.rows.at(-1).className = "row";
        Img.rows.at(-1).id = `${i}`;
        Img.gal_cont.appendChild(Img.rows.at(-1));
        Img.sqrs.push([]);
        let j = 0;
        while (j < Img.num_col) {
            Img.sqrs.at(-1).push(document.createElement("div"));
            Img.sqrs.at(-1)[j].className = "sqrs";
            Img.rows.at(-1).appendChild(Img.sqrs.at(-1)[j]);
            let rand_col = randomInt(0, 255)
            Img.sqrs.at(-1)[j].style.backgroundColor = `rgba(${rand_col}, ${rand_col}, ${rand_col}, ${randomFloat(0, 1)})`;
            j++;
        }
        i++;
    }
    Img.rows.forEach((e, i) => {
        e.onpointerdown = () => {
            ImgF.clickGal(i);
        }
    });
    ImgF.resizeSqrs();
}

ImgF.resizeSqrs = () => {
    let cont_rect = Img.cont.getBoundingClientRect();
    Img.sqrs.forEach(e => {
        e.forEach(f => {
            f.style.width = `${cont_rect.width / Img.num_col}px`;
            f.style.height = `${cont_rect.width / Img.num_col}px`;
        });
    });
}

ImgF.clickGal = (idx) => {
    if (!Img.is_drawing) ImgF.selImg(idx);
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

ImgF.selImg = (row_idx) => {
    shuffleArray(Img.idx_order);
    let img = Data.imgs[randomInt(0, Data.imgs.length)];
    let w_start = randomInt(0, img.width - Img.num_col);
    let h_start = randomInt(0, img.height - Img.num_col);
    let img_idx = [];
    let grid_idx = [];
    let grid_y = row_idx;
    let grid_x = 0;
    for (let h = h_start; h < h_start + Img.num_col; h++) {
        grid_x = 0;
        for (let w = w_start; w < w_start + Img.num_col; w++) {
            img_idx.push((h * img.width + w) * 4);
            let temp_grid = [grid_y, grid_x];
            grid_idx.push(temp_grid);
            grid_x++;
        }
        if (grid_y < row_idx + Img.num_col) grid_y++;
        else grid_y = row_idx;
    }
    ImgF.drawImg(img, img_idx, grid_idx, 0);
}

ImgF.drawImg = (img, img_idx, grid_idx, order_idx) => {
    img.loadPixels();
    if (order_idx == Img.idx_order.length) return;
    else {    
        let i = 0;
        while (i < Img.num_col / 5) {
            let idx = Img.idx_order[order_idx];
            let r = img.pixels[img_idx[idx]];
            let g = img.pixels[img_idx[idx + 1]];
            let b = img.pixels[img_idx[idx + 2]];
            if (grid_idx[idx][0] < Img.sqrs.length) {
                let sqr = Img.sqrs[grid_idx[idx][0]][grid_idx[idx][1]];
                sqr.style.backgroundColor = `rgb(${r}, ${g}, ${b}, 255)`
            }
            order_idx++;
            i++;
        }
        setTimeout(() => {
            ImgF.drawImg(img, img_idx, grid_idx, order_idx);
        }, 1);
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

preload = () => {
    Data.paths.forEach(e => {
        Data.imgs.push(loadImage(e));
    });
}

setup = () => {
    noCanvas();
    pixelDensity(1);
}

ImgF.initImg();
ImgF.initGal();