const HandsD = {
    title: "MÃOS",
    txt: `... de Georgia O'Stieglitz 2022<br>
    pixels -> pcm -> filtro de áudio -> pixels <br>
    (ao acaso e resumido para a internet) <br>
    (pode não funcionar em celulares)`,
    bckg: `let workletCode = \`class Worklet extends AudioWorkletProcessor {
        constructor() {
            super();
            this.run = true;
        }
    
        process(input) {
            this.port.onmessage = (e) => {
                if (e.data === "start") this.run = true;
                else this.run = false;
            }
            if (this.run) {
                let i = 0;
                while (i < input[0][0].length) {
                    this.port.postMessage(input[0][0][i]);
                    i++;
                }
            } else {
                this.port.postMessage("end");
                return false;
            }
            return true;
        }
    }
    registerProcessor("worklet", Worklet);\`;
    
    callWorklet = async () => {
        let blob = new Blob([workletCode], { type: "text/javascript" });
        let url = URL.createObjectURL(blob);
        await context.audioWorklet.addModule(url);
    }
    
    runWorklet = () => {
        WorkHands.worklet_node = new AudioWorkletNode(context, "worklet");
        AudioHands.final_gain.connect(WorkHands.worklet_node);
        WorkHands.worklet_node.port.postMessage("start");
        WorkHands.worklet_node.port.onmessage = (e) => {
            if (e.data === "end") {
                AudioHands.players[0].stopPlayer();
                AudioHands.players[1].stopPlayer();
                WorkHands.worklet_node.disconnect();
            } else {
                if (WorkHands.isWorking) {
                    WorkHands.pcm[WorkHands.work_index] = (e.data == 0) ? 1 : e.data;
                    WorkHands.work_index++;
                    if (WorkHands.work_index == WorkHands.pcm.length) WorkHands.work_index = 0;
                }
            }
        }
    }`,
    img_paths: [
        "./codigo/data/georgia_0.jpg",
        "./codigo/data/georgia_1.jpg",
        "./codigo/data/georgia_2.jpg",
        "./codigo/data/georgia_3.jpg",
        "./codigo/data/georgia_4.jpg"
    ]
}

const Hands = {
    inst: undefined,
    imgs: [],
    to_screen: undefined,
    item_cont: undefined,
    cnv_cont: undefined,
    cnv: undefined,
    cnv_bckg: undefined,
    txt_cont: undefined,
    txt_title: undefined,
    fullscreen: undefined,
    txt: undefined,
    ctx: undefined,
    final_gain: undefined,
    pcm: [],
    num_players: 2,
    players: [],
    controls: [],
    work_node: undefined,
    work_idx: 0,
    work_pcm: new Array(200 * 200 * 4),
    is_working: false,
    is_playing: false,
    ctrl_img: new Array(randomInt(0, HandsD.img_paths.length), randomInt(0, HandsD.img_paths.length)),
    ctrl_freq: new Array(randomInt(1, 4800), randomInt(1, 4800)),
    ctrl_q: new Array(randomFloat(0.0001, 24), randomFloat(0.0001, 24)),
    ctrl_gain: new Array(randomFloat(0.0001, 10), randomFloat(0.0001, 10))
}

const HandsF = {};

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

HandsF.initPg = () => {
    Hands.item_cont = document.createElement("div");
    Hands.item_cont.className = "item_container";
    document.getElementById("content_container").appendChild(Hands.item_cont);
    Hands.cnv_cont = document.createElement("div");
    Hands.cnv_cont.className = "canvas_container";
    Hands.item_cont.appendChild(Hands.cnv_cont);
    Hands.cnv_bckg = document.createElement("div");
    Hands.cnv_bckg.className = "canvas_background";
    Hands.cnv_bckg.innerHTML = HandsD.bckg;
    Hands.cnv_cont.appendChild(Hands.cnv_bckg);
    Hands.txt_cont = document.createElement("div");
    Hands.txt_cont.className = "text";
    Hands.item_cont.appendChild(Hands.txt_cont);
    Hands.txt_title = document.createElement("div");
    Hands.txt_title.className = "text_title";
    Hands.txt_title.innerHTML = HandsD.title;
    Hands.txt_cont.appendChild(Hands.txt_title);
    Hands.fullscreen = document.createElement("div");
    Hands.fullscreen.className = "fullscreen";
    Hands.txt_title.appendChild(Hands.fullscreen);
    Hands.txt = document.createElement("div");
    Hands.txt.className = "text";
    Hands.txt.innerHTML = HandsD.txt;
    Hands.txt_cont.appendChild(Hands.txt);
}

HandsF.initCanvas = () => {
    let cnv_sz = Math.floor(HandsF.canvasSz());
    Hands.cnv = Hands.inst.createCanvas(cnv_sz, cnv_sz);
    Hands.cnv_cont.appendChild(Hands.cnv.canvas);
    Hands.cnv_bckg.style.width = `${cnv_sz}px`;
    Hands.cnv_bckg.style.height = `${cnv_sz}px`;
}

HandsF.resizeCnv = () => {
    let cnv_sz = Math.floor(HandsF.canvasSz());
    Hands.cnv = Hands.inst.resizeCanvas(cnv_sz, cnv_sz);
    Hands.cnv_bckg.style.width = `${cnv_sz}px`;
    Hands.cnv_bckg.style.height = `${cnv_sz}px`;
}

HandsF.canvasSz = () => {
    if (window.innerWidth < window.innerHeight) {
        if (window.innerWidth < 820) return window.innerWidth * 0.8;
        else return 720;
    } else {
        if (window.innerHeight < 820) return window.innerHeight * 0.8;
        else return 720;
    }
}

HandsF.clickCnv = () => {
    Hands.cnv.canvas.onpointerdown = () => {
        if (Hands.final_gain == undefined) {
            Hands.ctx = new AudioContext();
            Hands.final_gain = Hands.ctx.createGain();
            Hands.final_gain.connect(Hands.ctx.destination);
            Hands.imgs.forEach(e => {
                e.loadPixels();
                let temp = [];
                let i = 0;
                while (i < e.pixels.length) {
                    temp.push(scaleVal(e.pixels[i], 0, 255, -1.0, 1.0));
                    i++;
                }
                Hands.pcm.push(temp);
            });
            Hands.players = [...Array(Hands.num_players)].map((e, i) => new Player(i));
            Hands.players.forEach((e, i) => Hands.controls = new Control(i));
            HandsF.callWorklet();
        } else {
            if (Hands.is_working) {
                Hands.work_node.port.postMessage("end");
                // Hands.cnv.canvas.style.opacity = "0";
                Hands.inst.noLoop();
            } else {
                // Hands.cnv.canvas.style.opacity = "1";
                Hands.inst.loop();
                HandsF.runWorklet();
                Hands.players.forEach(e => e.startPlayer());
            }
        }
        Hands.is_working = !Hands.is_working;
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

HandsF.callWorklet = async () => {
    await Hands.ctx.audioWorklet.addModule("./codigo/worklet_hands.js");
    Hands.work_node = new AudioWorkletNode(Hands.ctx, "worklet_h");
    Hands.players.forEach(e => e.startPlayer());
    // let set_control = new SetControl();
    // set_control.initControl();
    HandsF.runWorklet();
}

HandsF.runWorklet = () => {
    Hands.final_gain.connect(Hands.work_node);
    Hands.work_node.port.postMessage("start");
    Hands.work_node.port.onmessage = (e) => {
        if (e.data == "end") {
            if (Hands.is_playing) {
                Hands.players[0].stopPlayer();
                Hands.players[1].stopPlayer();
            }
        } else {
            if (Hands.is_working && e.data != undefined) {
                let i = 0;
                while (i < e.data.length) {
                    Hands.work_pcm[Hands.work_idx] = (e.data == 0) ? 1 : e.data[i];
                    Hands.work_idx++;
                    if (Hands.work_idx == Hands.work_pcm.length) Hands.work_idx = 0;
                    i++;
                }
            }
        }
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class Player {
    constructor(index) {
        this.pcm_i = index;
        this.source = undefined;
        this.filter = undefined;
        this.setFilter();
        this.setSource();
    }

    setFilter = () => {
        this.filter = Hands.ctx.createBiquadFilter(Hands.ctx);
        this.filter.connect(Hands.final_gain);
        this.filter.type = "bandpass";
        this.filter.frequency.value = randomInt(this.filter.frequency.minValue, this.filter.frequency.maxValue);
        this.filter.Q.value = randomFloat(0.0001, 24);
        this.filter.gain.value = randomFloat(1, 10);
        // this.set_control = new Control(this.pcm_i);
    }

    setSource = () => {
        this.source = Hands.ctx.createBufferSource();
        this.source.buffer = this.setBuffer();
        this.source.connect(this.filter);
        this.source.loop = true;
    }

    setBuffer = () => {
        this.pcm = new Float32Array(Hands.pcm[this.pcm_i]);
        this.buffer = Hands.ctx.createBuffer(1, this.pcm.length, Hands.ctx.sampleRate);
        this.buffer.copyToChannel(this.pcm, 0);
        return this.buffer;
    }

    startPlayer = () => {
        Hands.is_playing = true;
        this.startAt = Hands.work_idx / Hands.ctx.sampleRate;
        this.source.start(0, this.startAt);
    }

    stopPlayer = () => {
        Hands.is_playing = false;
        this.source.stop();
        this.setSource();
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class Control {
    constructor(idx) {
        this.player_idx = idx;
        this.Val = {
            img: Hands.players[this.player_idx].pcm_i,
            freq: Hands.players[idx].filter.frequency.value,
            q: Hands.players[idx].filter.Q.value,
            gain: Hands.players[idx].filter.gain.value
        }
        this.Scope = {
            img: HandsD.img_paths.length,
            frequency: [
                [1, 500],
                [1, 500],
                [500, 2000],
                [2000, 4800],
                [2000, 4800]
            ],
            q: [
                [0.0001, 1],
                [1, 12],
                [1, 12],
                [1, 12],
                [12, 24]
            ],
            gain: [
                [0.0001, 1],
                [0.0001, 1],
                [1, 5],
                [5, 10],
                [5, 10]
            ]
        }
        this.Time = {
            img: [1, 10000],
            frequency: [
                [100, 1000],
                [100, 1000],
                [1000, 5000],
                [1000, 5000],
                [5000, 15000]
            ],
            q: [
                [100, 1000],
                [1000, 5000],
                [1000, 5000],
                [5000, 15000],
                [5000, 15000]
            ],
            gain: [
                [100, 1000],
                [1000, 5000],
                [1000, 5000],
                [5000, 15000],
                [5000, 15000]
            ]
        }
        this.randImage();
        this.randFrequency();
        this.randQ();
        this.randGain();
    }

    randImage = () => {
        this.timer = randomInt(this.Time.img[0], this.Time.img[1]);
        setTimeout(() => {
            this.old = this.Val.img;
            this.temp = randomInt(0, this.Scope.img);
            this.Val.img = this.temp;
            this.setImage(this.old, this.temp);
            // if (Hands.is_working) this.randImage();
            this.randImage();
        }, this.timer);
    }

    setImage = (old, temp) => {
        if (old != temp) {
            Hands.players[this.player_idx].stopPlayer();
            Hands.players[this.player_idx].pcm_i = temp;
            Hands.players[this.player_idx].startPlayer();
        }
    }

    randFrequency = () => {
        this.time_s = randomInt(0, this.Time.frequency.length);
        this.timer = randomInt(this.Time.frequency[this.time_s][0], this.Time.frequency[this.time_s][1]);
        setTimeout(() => {
            this.temp_s = randomInt(0, this.Scope.frequency.length);
            this.temp = randomInt(this.Scope.frequency[this.temp_s][0], this.Scope.frequency[this.temp_s][1]);
            this.setFrequency(this.temp);
            // if (Hands.is_working) this.randFrequency();
            this.randFrequency();
        }, this.timer);
    }

    setFrequency = (temp) => {
        Hands.players[this.player_idx].filter.frequency.value = temp;
    }

    randQ = () => {
        this.time_s = randomInt(0, this.Time.q.length);
        this.timer = randomInt(this.Time.q[this.time_s][0], this.Time.q[this.time_s][1]);
        setTimeout(() => {
            this.temp_s = randomInt(0, this.Scope.q.length);
            this.temp = randomInt(this.Scope.q[this.temp_s][0], this.Scope.q[this.temp_s][1]);
            this.setQ(this.temp);
            // if (Hands.is_working) this.randQ();
            this.randQ();
        }, this.timer);
    }

    setQ = (temp) => {
        Hands.players[this.player_idx].filter.Q.value = temp;
    }

    randGain = () => {
        this.time_s = randomInt(0, this.Time.gain.length);
        this.timer = randomInt(this.Time.gain[this.time_s][0], this.Time.gain[this.time_s][1]);
        setTimeout(() => {
            this.temp_s = randomInt(0, this.Scope.gain.length);
            this.temp = randomInt(this.Scope.gain[this.temp_s][0], this.Scope.gain[this.temp_s][1]);
            this.setGain(this.temp);
            // if (Hands.is_working) this.randGain();
            this.randGain();
        }, this.timer);
    }

    setGain = (temp) => {
        Hands.players[this.player_idx].filter.gain.value = temp;
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const hands_inst = new p5((hands) => {
    hands.preload = () => {
        HandsD.img_paths.forEach(e => {
            Hands.imgs.push(hands.loadImage(e));
        });
        Hands.to_screen = hands.createImage(200, 200);
    }

    hands.setup = () => {
        hands.pixelDensity(1);
        hands.noCanvas();
        HandsF.initPg();
        Hands.inst = hands;
        HandsF.initCanvas();
        HandsF.clickCnv();
    }

    hands.draw = () => {
        if (Hands.is_working) {
            Hands.to_screen.loadPixels();
            hands.i = (Hands.work_idx - 1600 < 0) ? 0 : Hands.work_idx - 1600;
            while (hands.i < Hands.work_idx) {
                Hands.to_screen.pixels[hands.i] = scaleVal(Hands.work_pcm[hands.i], -1.0, 1.0, 0, 255);
                hands.i++;
            }
            Hands.to_screen.updatePixels();
        }
        hands.image(Hands.to_screen, 0, 0, hands.width, hands.height);
    }
});
