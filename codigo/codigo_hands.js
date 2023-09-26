const handsTitle = `MÃOS`;
const handsText = `... de Georgia O'Stieglitz 2022<br>
pixels -> pcm -> filtro de áudio -> pixels <br>
(ao acaso para a internet) <br>
(pode não funcionar no firefox ou em celulares)`;
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
    img: new Array(randomInt(0, ImgHands.paths.length), randomInt(0, ImgHands.paths.length)),
    frequency: new Array(randomInt(1, 4800), randomInt(1, 4800)),
    q: new Array(randomFloat(0.0001, 24), randomFloat(0.0001, 24)),
    gain: new Array(randomFloat(0.0001, 10), randomFloat(0.0001, 10))
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
    AudHands.players.forEach(e => e.startPlayer());
    this.set_control = new SetControl();
    this.set_control.initControl();
    runWorklet();
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
            if (WorkHands.isWorking && e.data != undefined) {
                let i = 0;
                while (i < e.data.length) {
                    WorkHands.pcm[WorkHands.work_index] = (e.data == 0) ? 1 : e.data[i];
                    WorkHands.work_index++;
                    if (WorkHands.work_index == WorkHands.pcm.length) WorkHands.work_index = 0;
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
        this.filter.Q.value = randomFloat(0.0001, 24);
        this.filter.gain.value = randomFloat(1, 10);
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

class SetControl {
    constructor() {
        this.Scope = {
            img: ImgHands.paths.length,
            frequency: [],
            q: [],
            gain: []
        }

        this.Time = {
            img: [1, 15000],
            frequency: [],
            q: [],
            gain: []
        }
        this.setScope();
        this.setTime();
    }

    initControl = () => {
        ControlHands.img = [];
        ControlHands.frequency = [];
        ControlHands.q = [];
        ControlHands.gain = [];
        for (this.i = 0; this.i < 2; this.i++) {
            ControlHands.img[this.i] = this.randomImage(this.i);
            ControlHands.frequency[this.i] = this.randomFrequency(this.i);
            ControlHands.q[this.i] = this.randomQ(this.i);
            ControlHands.gain[this.i] = this.randomGain(this.i);
        }
    }

    setScope = () => {
        for (this.i = 0; this.i < 2; this.i++) this.Scope.frequency.push([1, 500]);
        for (this.i = 0; this.i < 1; this.i++) this.Scope.frequency.push([500, 2000]);
        for (this.i = 0; this.i < 2; this.i++) this.Scope.frequency.push([2000, 4800]);
        for (this.i = 0; this.i < 2; this.i++) this.Scope.q.push([0.0001, 1]);
        for (this.i = 0; this.i < 2; this.i++) this.Scope.q.push([1, 12]);
        for (this.i = 0; this.i < 1; this.i++) this.Scope.q.push([12, 24]);
        for (this.i = 0; this.i < 2; this.i++) this.Scope.gain.push([0.0001, 1]);
        for (this.i = 0; this.i < 1; this.i++) this.Scope.gain.push([1, 5]);
        for (this.i = 0; this.i < 2; this.i++) this.Scope.gain.push([5, 10]);
    }

    setTime = () => {
        for (this.i = 0; this.i < 2; this.i++) this.Time.frequency.push([100, 1000]);
        for (this.i = 0; this.i < 2; this.i++) this.Time.frequency.push([1000, 15000]);
        for (this.i = 0; this.i < 1; this.i++) this.Time.frequency.push([15000, 30000]);
        for (this.i = 0; this.i < 1; this.i++) this.Time.q.push([100, 1000]);
        for (this.i = 0; this.i < 2; this.i++) this.Time.q.push([1000, 15000]);
        for (this.i = 0; this.i < 2; this.i++) this.Time.q.push([15000, 30000]);
        for (this.i = 0; this.i < 1; this.i++) this.Time.gain.push([100, 1000]);
        for (this.i = 0; this.i < 2; this.i++) this.Time.gain.push([1000, 15000]);
        for (this.i = 0; this.i < 2; this.i++) this.Time.gain.push([15000, 30000]);
    }

    randomImage = (player_index) => {
        this.time_scope = randomInt(0, this.Time.img.length);
        this.timer = randomInt(this.Time.img[0], this.Time.img[1]);
        setTimeout(() => {
            this.old = ControlHands.img[player_index];
            this.temp = randomInt(0, this.Scope.img);
            ControlHands.img[player_index] = this.temp;
            this.setImage(player_index, this.old, this.temp);
            if (WorkHands.isWorking) this.randomImage(player_index);
        }, this.timer);
    }

    setImage = (player_index, old, temp) => {
        if (old != temp) {
            AudHands.players[player_index].stopPlayer();
            AudHands.players[player_index].pcm_index = temp;
            AudHands.players[player_index].startPlayer();
        }
    }

    randomFrequency = (player_index) => {
        this.time_scope = randomInt(0, this.Time.frequency.length);
        this.timer = randomInt(this.Time.frequency[this.time_scope][0], this.Time.frequency[this.time_scope][1]);
        setTimeout(() => {
            this.temp_scope = randomInt(0, this.Scope.frequency.length);
            this.temp = randomInt(this.Scope.frequency[this.temp_scope][0], this.Scope.frequency[this.temp_scope][1]);
            this.setFrequency(player_index, this.temp);
            if (WorkHands.isWorking) this.randomFrequency(player_index);
        }, this.timer);
    }

    setFrequency = (player_index, temp) => {
        AudHands.players[player_index].filter.frequency.value = temp;
    }

    randomQ = (player_index) => {
        this.time_scope = randomInt(0, this.Time.q.length);
        this.timer = randomInt(this.Time.q[this.time_scope][0], this.Time.q[this.time_scope][1]);
        setTimeout(() => {
            this.temp_scope = randomInt(0, this.Scope.q.length);
            this.temp = randomFloat(this.Scope.q[this.temp_scope][0], this.Scope.q[this.temp_scope][1]);
            this.setQ(player_index, this.temp);
            if (WorkHands.isWorking) this.randomQ(player_index);
        }, this.timer);
    }

    setQ = (player_index, temp) => {
        AudHands.players[player_index].filter.Q.value = temp;
    }

    randomGain = (player_index) => {
        this.time_scope = randomInt(0, this.Time.gain.length);
        this.timer = randomInt(this.Time.gain[this.time_scope][0], this.Time.gain[this.time_scope][1]);
        setTimeout(() => {
            this.temp_scope = randomInt(0, this.Scope.gain.length);
            this.temp = randomFloat(this.Scope.gain[this.temp_scope][0], this.Scope.gain[this.temp_scope][1]);
            this.setGain(player_index, this.temp);
            if (WorkHands.isWorking) this.randomGain(player_index);
        }, this.timer);
    }

    setGain = (player_index, temp) => {
        AudHands.players[player_index].filter.gain.value = temp;
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