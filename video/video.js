preload = () => {
    Gif.paths.forEach(e => {
        Gif.gif.push(createVideo(e).hide());
        Menu.to_screen = createGraphics(500, 500);
    });
    setTimeout(() => {
        document.getElementById("cover").style.display = "none";
    }, 2000);
}

setup = () => {
    noCanvas();
    pixelDensity(1);
    frameRate(15);
    Menu.menu_obj = new SetMenu();
}

draw = () => {
    if (Menu.run_gif) Menu.menu_obj.colorText();
    else Menu.menu_obj.setText();
    image(Menu.to_screen, 0, 0, Menu.canvas.canvas.width, Menu.canvas.canvas.height);
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetMenu {
    constructor() {
        this.Cnv = {
            sel_gif: undefined,
            last_gif: undefined,
            canvas_wh: undefined,
            to_screen_wh: undefined,
            div_canvas: 40,
            pix_colors: [],
            bw_thresh: [175, 127, 50, 127, 175, 127]
        }
        this.Keyframes = {
            canvas: undefined,
            title: undefined
        }
        this.Options = {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out",
            direction: "reverse"
        }
        this.Item = {
            item_container: [],
            close: []
        }
        this.canvas_timer = undefined;
        this.isItemOpen = false;
        this.initPg();
        this.initCanvas();
    }

    initPg = () => {
        Menu.menu_container = document.createElement("div");
        Menu.menu_container.className = "menu_container";
        Menu.content_container.appendChild(Menu.menu_container);
        Menu.title_container = document.createElement("div");
        Menu.title_container.className = "title_container";
        Menu.menu_container.appendChild(Menu.title_container);
        videoTitle.forEach(e => {
            Menu.titles.push(document.createElement("div"));
            Menu.titles.at(-1).className = "title";
            Menu.title_container.appendChild(Menu.titles.at(-1));
            Menu.titles.at(-1).innerHTML = e;
        });
    }

    initCanvas = () => {
        this.Cnv.canvas_wh = this.getCanvasSize();
        this.Cnv.to_screen_wh = Menu.to_screen.width;
        Menu.canvas = createCanvas(this.Cnv.canvas_wh, this.Cnv.canvas_wh);
        Menu.menu_container.insertBefore(Menu.canvas.canvas, Menu.title_container);
        this.initItem();
        this.setText();
        this.setKeyframes();
        this.setClick();
        removeLogo();
    }

    resetCanvas = () => {
        this.Cnv.canvas_wh = this.getCanvasSize();
        resizeCanvas(this.Cnv.canvas_wh, this.Cnv.canvas_wh);
    }

    getCanvasSize = () => {
        if (window.innerWidth < window.innerHeight) {
            if (window.innerWidth <= 820) return Math.floor(window.innerWidth * 0.8);
            else return 720;
        } else {
            if (window.innerHeight <= 820) return Math.floor(window.innerHeight * 0.8);
            else return 720;
        }
    }

    initItem = () => {
        VideoItems.forEach((e, i) => {
            this.Item.item_container.push(document.createElement("div"));
            this.Item.close.push(document.createElement("div"));
            Menu.video_obj.push(new VideoObj(e, this.Item.item_container[i], this.Item.close[i]));
        });
    }

    setText = () => {
        Menu.to_screen.background(230);
        this.step_sz = Math.floor(this.Cnv.to_screen_wh / this.Cnv.div_canvas);
        this.text_i = 0;
        Menu.to_screen.textSize(this.step_sz);
        for (this.y = 0; this.y < this.Cnv.to_screen_wh - this.step_sz; this.y += this.step_sz) {
            for (this.x = 0; this.x < this.Cnv.to_screen_wh - this.step_sz; this.x += this.step_sz) {
                if (this.Cnv.pix_colors.length > 0) {
                    if (this.Cnv.pix_colors[this.text_i] > this.Cnv.bw_thresh[this.Cnv.sel_gif]) {
                        Menu.to_screen.fill(255);
                    } else {
                        Menu.to_screen.fill(0);
                    }
                } else Menu.to_screen.fill(0);
                Menu.to_screen.text(String(menuBackground[this.text_i]), this.x, this.y, this.step_sz, this.step_sz);
                this.text_i++;
            }
        }
    }

    colorText = () => {
        this.Cnv.pix_colors = [];
        this.step_sz = Math.floor(this.Cnv.to_screen_wh / this.Cnv.div_canvas);
        Gif.gif[this.Cnv.sel_gif].loadPixels();
        for (this.y = 0; this.y < Gif.gif[this.Cnv.sel_gif].height - this.step_sz; this.y += this.step_sz) {
            for (this.x = 0; this.x < Gif.gif[this.Cnv.sel_gif].width - this.step_sz; this.x += this.step_sz) {
                this.sum = 0;
                this.num = 0;
                for (this.y_ = 0; this.y_ < this.step_sz; this.y_++) {
                    for (this.x_ = 0; this.x_ < this.step_sz; this.x_++) {
                        if (this.x + this.x_ < Gif.gif[this.Cnv.sel_gif].width) {
                            this.index = ((this.y_ + this.y) * Gif.gif[this.Cnv.sel_gif].width + (this.x_ + this.x)) * 4;
                            this.r = Gif.gif[this.Cnv.sel_gif].pixels[this.index + 0];
                            this.g = Gif.gif[this.Cnv.sel_gif].pixels[this.index + 1];
                            this.b = Gif.gif[this.Cnv.sel_gif].pixels[this.index + 2];
                            this.sum = this.sum + (this.r + this.g + this.b) / 3;
                            this.num++;
                        }
                    }
                }
                if (this.num != 0) this.Cnv.pix_colors.push(Math.floor(this.sum / this.num));
            }
        }
        Gif.gif[this.Cnv.sel_gif].updatePixels();
        this.setText();
    }

    setKeyframes = () => {
        this.Keyframes.canvas = [
            {
                width: "0px",
                height: "0px"
            },
            {
                width: `${this.getCanvasSize()}px`,
                height: `${this.getCanvasSize()}px`
            }
        ];
        this.Keyframes.title = [
            {
                fontSize: "0px",
                borderLeft: "none",
                borderBottom: "none"
            },
            {
                fontSize: "calc(var(--fontSize) * 1.3)",
                borderLeft: "1px solid var(--black)",
                borderBottom: "1px solid var(--black)"
            }
        ];
    }

    setClick = () => {
        Menu.titles.forEach((e, i) => {
            e.onpointerdown = () => {
                this.Cnv.last_gif = this.Cnv.sel_gif;
                this.Cnv.sel_gif = i;
                Gif.gif[i].loop();
                if (this.Cnv.last_gif != undefined) Gif.gif[this.Cnv.last_gif].stop();
                Menu.run_gif = true;
                this.canvas_timer = setTimeout(() => { this.closeCanvas() }, 10000);
                Menu.titles.forEach((f, j) => {
                    if (i != j) f.style.pointerEvents = "all";
                });
                e.style.pointerEvents = "none";
            }
        });
        Menu.canvas.canvas.onpointerdown = () => {
            if (Menu.run_gif) {
                if (this.canvas_timer != undefined) clearTimeout(this.canvas_timer);
                this.closeCanvas();
            }
        };
        this.Item.close.forEach((e, i) => {
            e.onpointerdown = () => {
                Menu.video_obj[i].setAnimation("reverse");
                this.runMenuAnimation();
            }
        });
    }

    closeCanvas = () => {
        this.runMenuAnimation();
        Menu.video_obj[this.Cnv.sel_gif].setAnimation("normal");
        this.Cnv.pix_colors = [];
        this.setText();
        Menu.run_gif = false;
        Gif.gif[this.Cnv.sel_gif].stop();
        Menu.titles[this.Cnv.sel_gif].style.pointerEvents = "all";
        this.Cnv.last_gif = undefined;
        this.Cnv.sel_gif = undefined;
    }

    runMenuAnimation = () => {
        if (this.isItemOpen) this.Options.direction = "normal";
        else this.Options.direction = "reverse";
        this.isItemOpen = !this.isItemOpen;
        this.Keyframes.canvas[1].width = `${this.getCanvasSize()}px`;
        this.Keyframes.canvas[1].height = `${this.getCanvasSize()}px`;
        Menu.canvas.canvas.animate(this.Keyframes.canvas, this.Options);
        Menu.titles.forEach(e => e.animate(this.Keyframes.title, this.Options));
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class VideoObj {
    constructor(video_item, container, close) {
        this.Elt = {
            item_container: container,
            close: close,
            title: undefined,
            subtitle: [],
            text: [],
            video: [],
            audio_container: [],
            audio: [],
            label: [
                "title",
                "text",
                "subtitle",
                "video",
                "audio"
            ]
        }
        this.Keyframes = {
            width: [{ width: "clamp(0%, 0%, 0%)" }, { width: "clamp(220px, 80%, 650px)" }]
        }
        this.Options = {
            duration: 200,
            fill: "forwards",
            easing: "ease-in-out",
            direction: "normal"
        }
        this.setPg(video_item);
    }

    setPg = (video_item) => {
        this.Elt.item_container.className = "item_container";
        Menu.content_container.appendChild(this.Elt.item_container);
        this.Elt.close.className = "close";
        this.Elt.item_container.appendChild(this.Elt.close);
        this.border_index = 0;
        video_item.order.forEach((e) => {
            switch (true) {
                case e == "title":
                    this.Elt.title = document.createElement("div");
                    this.Elt.title.className = "item_title";
                    this.Elt.item_container.appendChild(this.Elt.title);
                    break;
                case e == "subtitle":
                    this.Elt.subtitle.push(document.createElement("div"));
                    this.Elt.subtitle.at(-1).className = "item_subtitle";
                    this.Elt.item_container.appendChild(this.Elt.subtitle.at(-1));
                    break;
                case e == "text":
                    this.Elt.text.push(document.createElement("div"));
                    this.Elt.text.at(-1).className = "item_text";
                    this.Elt.item_container.appendChild(this.Elt.text.at(-1));
                    this.Elt.text.at(-1).style.borderTop = "2px solid var(--black)";
                    if (this.border_index % 2 == 0) this.Elt.text.at(-1).style.borderLeft = "2px solid var(--black)";
                    else this.Elt.text.at(-1).style.borderRight = "2px solid var(--black)";
                    this.border_index++;
                    break;
                case e == "video":
                    this.Elt.video.push(document.createElement("video"));
                    this.Elt.item_container.appendChild(this.Elt.video.at(-1));
                    this.Elt.video.at(-1).style.borderTop = "2px solid var(--black)";
                    if (this.border_index % 2 == 0) this.Elt.video.at(-1).style.borderLeft = "2px solid var(--black)";
                    else this.Elt.video.at(-1).style.borderRight = "2px solid var(--black)";
                    this.border_index++;
                    break;
                case e == "audio":
                    this.Elt.audio_container.push(document.createElement("div"));
                    this.Elt.audio_container.at(-1).className = "item_audio";
                    this.Elt.audio.push(document.createElement("audio"));
                    this.Elt.audio_container.at(-1).appendChild(this.Elt.audio.at(-1));
                    this.Elt.item_container.appendChild(this.Elt.audio_container.at(-1));
                    this.Elt.audio_container.at(-1).style.borderTop = "2px solid var(--black)";
                    if (this.border_index % 2 == 0) this.Elt.audio_container.at(-1).style.borderLeft = "2px solid var(--black)";
                    else this.Elt.audio_container.at(-1).style.borderRight = "2px solid var(--black)";
                    this.border_index++;
                    break;
            }
        });
        this.setTitle(video_item);
        this.setSubtitle(video_item);
        this.setText(video_item);
        this.setVideo(video_item);
        this.setAudio(video_item);
    }

    setTitle = (video_item) => {
        this.Elt.title.innerHTML = video_item.title;
    }

    setSubtitle = (video_item) => {
        if (this.Elt.subtitle.length > 0) {
            this.Elt.subtitle.forEach((e, i) => {
                e.innerHTML = video_item.subtitle[i];
            });
        }
    }

    setText = (video_item) => {
        if (this.Elt.text.length > 0) {
            this.Elt.text.forEach((e, i) => {
                e.innerHTML = video_item.text[i][0];
            });
        }
    }

    setVideo = (video_item) => {
        if (this.Elt.video.length > 0) {
            this.Elt.video.forEach((e, i) => {
                e.src = video_item.videoPath[i];
                e.controls = "controls";
                e.controlsList = "nodownload";
                e.preload = "metadata";
            });
        }
    }

    setAudio = (video_item) => {
        if (this.Elt.audio.length > 0) {
            this.Elt.audio.forEach((e, i) => {
                e.src = video_item.audioPath[i];
                e.controls = "controls";
                e.controlsList = "nodownload";
                e.preload = "metadata";
            });
        }
    }

    setAnimation = (direction) => {
        this.Options.direction = direction;
        if (this.Options.direction == "normal") this.Elt.item_container.style.display = "flex";
        else setTimeout(() => { this.Elt.item_container.style.display = "none" }, this.Options.duration);
        this.Elt.item_container.animate(this.Keyframes.width, this.Options);
        this.Elt.video.forEach(e => e.pause());
        this.Elt.audio.forEach(e => e.pause());
    }
}