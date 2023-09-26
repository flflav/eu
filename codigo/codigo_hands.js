const handsTitle = `MÃOS`;
const handsText = `... de Georgia O'Stieglitz 2022<br>
pixels -> pcm -> filtro de áudio -> pixels <br>
(ao acaso para a internet)`;
const handsBackground = `let workletCode = \`class Worklet extends AudioWorkletProcessor {
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
}`;

const ImgHands = {
    paths: [
        "./codigo/data/georgia_0.png",
        "./codigo/data/georgia_1.png",
        "./codigo/data/georgia_2.png",
        "./codigo/data/georgia_3.png",
        "./codigo/data/georgia_4.png"
    ],
    imgs: [],
    to_screen: undefined,
    raster_i: 0,
}

const AudHands = {
    ctx: undefined,
    final_gain: undefined,
    pcm: [],
    num_players: 2,
    load_pcm: undefined,
    players: [],
    loaded: false,
    isPlaying: false
}

const WorkHands = {
    node: undefined,
    pcm: new Array(500 * 500 * 4),
    work_index: 0,
    isWorking: false
}

const EltHands = {
    content_container: document.getElementById("content_container"),
    item: undefined,
    canvas_container: undefined,
    canvas: undefined,
    canvas_background: undefined,
    text_container: undefined,
    text_title: undefined,
    fullscreen: undefined,
    text: undefined
}

const ControlHands = {
    img: [],
    freq: [],
    q: [],
    gain: []
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetPgHands {
    constructor(inst) {
        this.inst = inst;
        this.load_pcm = undefined;
        this.setPg();
        this.setClick();
    }

    setPg = () => {
        EltHands.item = document.createElement("div");
        EltHands.item.className = "item";
        EltHands.content_container.appendChild(EltHands.item);
        EltHands.canvas_container = document.createElement("div");
        EltHands.canvas_container.className = "canvas_container";
        EltHands.item.appendChild(EltHands.canvas_container);
        EltHands.canvas_background = document.createElement("div");
        EltHands.canvas_background.className = "code_background";
        EltHands.canvas_background.innerHTML = handsBackground;
        EltHands.canvas_container.appendChild(EltHands.canvas_background);
        EltHands.text_container = document.createElement("div");
        EltHands.text_container.className = "text";
        EltHands.item.appendChild(EltHands.text_container);
        EltHands.text_title = document.createElement("div");
        EltHands.text_title.className = "text_title";
        EltHands.text_title.innerHTML = handsTitle;
        EltHands.text_container.appendChild(EltHands.text_title);
        EltHands.fullscreen = document.createElement("div");
        EltHands.fullscreen.className = "fullscreen";
        EltHands.text_title.appendChild(EltHands.fullscreen);
        EltHands.text = document.createElement("div");
        EltHands.text.className = "text";
        EltHands.text.innerHTML = handsText;
        EltHands.text_container.appendChild(EltHands.text);
        this.initCanvas();
    }

    initCanvas = () => {
        this.canvas_sz = Math.floor(this.canvasSize());
        EltHands.canvas = this.inst.createCanvas(this.canvas_sz, this.canvas_sz).class("code_canvas");
        EltHands.canvas_background.style.width = `${this.canvas_sz}px`;
        EltHands.canvas_background.style.height = `${this.canvas_sz}px`;
        EltHands.canvas_container.appendChild(EltHands.canvas.canvas);
    }

    resetCanvas = () => {
        this.canvas_sz = Math.floor(this.canvasSize());
        this.inst.resizeCanvas(this.canvas_sz, this.canvas_sz);
        EltHands.canvas_background.style.width = `${this.canvas_sz}px`;
        EltHands.canvas_background.style.height = `${this.canvas_sz}px`;
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
    setClick = () => {
        EltHands.canvas.canvas.onpointerdown = async () => {
            if (!AudHands.loaded) {
                AudHands.ctx = new AudioContext();
                AudHands.final_gain = AudHands.ctx.createGain();
                AudHands.final_gain.connect(AudHands.ctx.destination);
                AudHands.load_pcm = new LoadPcm();
                callWorklet();
                AudHands.loaded = true;
            } else {
                if (WorkHands.isWorking) {
                    WorkHands.node.port.postMessage("end");
                } else {
                    runWorklet();
                    AudHands.players.forEach(e => e.startPlayer());
                }
            }
            WorkHands.isWorking = !WorkHands.isWorking;
        }
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

callWorklet = async () => {
    await AudHands.ctx.audioWorklet.addModule("./codigo/worklet_hands.js");
    WorkHands.node = new AudioWorkletNode(AudHands.ctx, "worklet_h");
    
    runWorklet();
    AudHands.players.forEach(e => e.startPlayer());
}

runWorklet = () => {
    AudHands.final_gain.connect(WorkHands.node);
    WorkHands.node.port.postMessage("start");
    WorkHands.node.port.onmessage = (e) => {
        if (e.data === "end") {
            if (AudHands.isPlaying) {
                AudHands.players[0].stopPlayer();
                AudHands.players[1].stopPlayer();
            }
        } else {
            if (WorkHands.isWorking) {
                this.j = 0;
                while (this.j < e.data.length) {
                    WorkHands.pcm[WorkHands.work_index] = (e.data == 0) ? 1 : e.data[this.j];
                    WorkHands.work_index++;
                    if (WorkHands.work_index == WorkHands.pcm.length) WorkHands.work_index = 0;
                    this.j++;
                }
            }
        }
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class LoadPcm {
    constructor() {
        ImgHands.imgs.forEach(e => {
            this.pcm = [];
            e.loadPixels();
            e.pixels.forEach(f => {
                this.pcm.push(scaleVal(f, 0, 255, -1.0, 1.0));
            });
            AudHands.pcm.push(this.pcm);
        });
        AudHands.players = [...Array(AudHands.num_players)].map((e, i) => new SetPlayer(i));
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetPlayer {
    constructor(index) {
        this.pcm_i = index;
        this.source = undefined;
        this.filter = undefined;
        this.setFilter();
        this.setSource();
    }

    setFilter = () => {
        this.filter = AudHands.ctx.createBiquadFilter(AudHands.ctx);
        this.filter.connect(AudHands.final_gain);
        this.filter.type = "bandpass";
        this.filter.frequency.value = randomInt(this.filter.frequency.minValue, this.filter.frequency.maxValue);
        this.filter.Q.value = randomFloat(this.filter.Q.minValue, this.filter.Q.maxValue);
        this.filter.gain.value = randomFloat(this.filter.gain.minValue, this.filter.gain.maxValue);
    }

    setSource = () => {
        this.source = AudHands.ctx.createBufferSource();
        this.source.buffer = this.setBuffer();
        this.source.connect(this.filter);
        this.source.loop = true;
    }

    setBuffer = () => {
        this.pcm = new Float32Array(AudHands.pcm[this.pcm_i]);
        this.buffer = AudHands.ctx.createBuffer(1, this.pcm.length, AudHands.ctx.sampleRate);
        this.buffer.copyToChannel(this.pcm, 0);
        return this.buffer;
    }

    startPlayer = () => {
        AudHands.isPlaying = true;
        this.startAt = WorkHands.work_index / AudHands.ctx.sampleRate;
        this.source.start(0, this.startAt);
    }

    stopPlayer = () => {
        AudHands.isPlaying = false;
        this.source.stop();
        this.setSource();
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const hands_inst = new p5((hands) => {
    hands.preload = () => {
        ImgHands.paths.forEach(e => {
            ImgHands.imgs.push(hands.loadImage(e));
        });
        ImgHands.to_screen = hands.createImage(500, 500);
    }

    hands.setup = () => {
        hands.pixelDensity(1);
        hands.noCanvas();
        hands.set_pg = new SetPgHands(hands);
    }

    hands.draw = () => {
        if (WorkHands.isWorking) {
            ImgHands.to_screen.loadPixels();
            hands.i = (WorkHands.work_index - 1840 < 0) ? 0 : WorkHands.work_index - 1840;
            while (hands.i < WorkHands.work_index) {
                ImgHands.to_screen.pixels[hands.i] = scaleVal(WorkHands.pcm[hands.i], -1.0, 1.0, 0, 255);
                hands.i++;
            }
            ImgHands.to_screen.updatePixels();
        }
        hands.image(ImgHands.to_screen, 0, 0, hands.width, hands.height);
    }
});