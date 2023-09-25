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

const context = new AudioContext();

const ImgHands = {
    paths: new Array(
        "./codigo/data/georgia_0.png",
        "./codigo/data/georgia_1.png",
        "./codigo/data/georgia_2.png",
        "./codigo/data/georgia_3.png",
        "./codigo/data/georgia_4.png"
    ),
    imgs: [],
    to_screen: undefined
}

const AudioHands = {
    final_gain: context.createGain(),
    pcm: [],
    players: [],
    isPlaying: false
}

const WorkHands = {
    worklet_node: undefined,
    pcm: new Array(500 * 500 * 4),
    work_index: 0
}

const ElementsHands = {
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

let workletCode = `class Worklet extends AudioWorkletProcessor {
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
registerProcessor("worklet", Worklet);`;

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
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

const handsInstance = new p5((hands) => {
    hands.preload = () => {
        ImgHands.paths.forEach((e) => {
            ImgHands.imgs.push(hands.loadImage(e));
        });
        ImgHands.to_screen = hands.createImage(500, 500);
    }

    hands.setup = () => {
        hands.pixelDensity(1);
        hands.set_canvas = new SetCanvasHands(hands);
        hands.load_pcm = new LoadPcm(hands);
        callWorklet();
        hands.noLoop();
    }

    hands.draw = () => {
        if (WorkHands.isWorking) {
            ImgHands.to_screen.loadPixels();
            hands.i = (WorkHands.work_index - 7200 < 0) ? 0 : WorkHands.work_index - 7200;
            while (hands.i < WorkHands.work_index) {
                ImgHands.to_screen.pixels[hands.i] = hands.map(WorkHands.pcm[hands.i], -1.0, 1.0, 0, 255);
                hands.i++;
            }
            ImgHands.to_screen.updatePixels();
        }
        hands.image(ImgHands.to_screen, 0, 0, hands.width, hands.height);
    }
});

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetCanvasHands {
    constructor(instance) {
        this.instance = instance;
        this.setHtml();
        this.setClicks();
        this.set_control = new SetControl();
    }

    setHtml = () => {
        ElementsHands.item = document.createElement("div");
        ElementsHands.item.className = "item";
        ElementsHands.content_container.appendChild(ElementsHands.item);
        ElementsHands.canvas_container = document.createElement("div");
        ElementsHands.canvas_container.className = "canvas_container";
        ElementsHands.item.appendChild(ElementsHands.canvas_container);
        ElementsHands.canvas_background = document.createElement("div");
        ElementsHands.canvas_background.className = "code_background";
        ElementsHands.canvas_background.innerHTML = handsBackground;
        ElementsHands.canvas_container.appendChild(ElementsHands.canvas_background);
        ElementsHands.text_container = document.createElement("div");
        ElementsHands.text_container.className = "text";
        ElementsHands.item.appendChild(ElementsHands.text_container);
        ElementsHands.text_title = document.createElement("div");
        ElementsHands.text_title.className = "text_title";
        ElementsHands.text_title.innerHTML = handsTitle;
        ElementsHands.text_container.appendChild(ElementsHands.text_title);
        ElementsHands.fullscreen = document.createElement("div");
        ElementsHands.fullscreen.className = "fullscreen";
        ElementsHands.text_title.appendChild(ElementsHands.fullscreen);
        ElementsHands.text = document.createElement("div");
        ElementsHands.text.className = "text";
        ElementsHands.text.innerHTML = handsText;
        ElementsHands.text_container.appendChild(ElementsHands.text); 
        this.initCanvas();   
    }

    initCanvas = () => {
        this.canvas_sz = Math.floor(this.canvasSize());
        ElementsHands.canvas = this.instance.createCanvas(this.canvas_sz, this.canvas_sz).class("code_canvas");
        ElementsHands.canvas_background.style.width = `${this.canvas_sz}px`;
        ElementsHands.canvas_background.style.height = `${this.canvas_sz}px`;
        ElementsHands.canvas_container.appendChild(ElementsHands.canvas.canvas);
    }

    resetCanvas = () => {
        this.canvas_sz = Math.floor(this.canvasSize());
        this.instance.resizeCanvas(this.canvas_sz, this.canvas_sz);
        ElementsHands.canvas_background.style.width = `${this.canvas_sz}px`;
        ElementsHands.canvas_background.style.height = `${this.canvas_sz}px`;
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
        ElementsHands.canvas.canvas.addEventListener("pointerdown", () => {
            if (WorkHands.isWorking) {
                WorkHands.worklet_node.port.postMessage("end");
                this.instance.noLoop();
            } else {
                this.instance.loop();
                runWorklet();
                AudioHands.players[0].startPlayer();
                AudioHands.players[1].startPlayer();
                this.set_control.initControl();
            }
            WorkHands.isWorking = !WorkHands.isWorking;
        });
        ElementsHands.fullscreen.addEventListener("pointerdown", () => {
            ElementsHands.canvas.canvas.requestFullscreen();
        });
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class LoadPcm {
    constructor(instance) {
        ImgHands.imgs.forEach((e) => {
            this.pcm = [];
            e.loadPixels();
            e.pixels.forEach((p) => {
                this.pcm.push(instance.map(p, 0, 255, -1.0, 1.0));
            });
            AudioHands.pcm.push(this.pcm);
        });
        AudioHands.players.push(new SetPlayer(ControlHands.img[0]));
        AudioHands.players.push(new SetPlayer(ControlHands.img[1]));
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//##########################################################################//
//##########################################################################//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

class SetPlayer {
    constructor(pcm_index) {
        this.pcm_index = pcm_index;
        this.source = undefined;
        this.filter = undefined;
        this.setFilter();
        this.setGain();
        this.setSource();
    }

    setFilter = () => {
        this.filter = context.createBiquadFilter(context);
        this.filter.connect(AudioHands.final_gain);
        this.filter.type = "bandpass";
        this.filter.frequency.value = 1000;
        this.filter.Q.value = 1;
        this.filter.gain.value = 1;
    }

    setGain = () => {
        AudioHands.final_gain.connect(context.destination);
    }

    setSource = () => {
        this.source = context.createBufferSource();
        this.source.buffer = this.setBuffer();
        this.source.connect(this.filter);
        this.source.loop = true;
    }

    setBuffer = () => {
        this.pcm = new Float32Array(AudioHands.pcm[this.pcm_index]);
        this.buffer = context.createBuffer(1, this.pcm.length, context.sampleRate);
        this.buffer.copyToChannel(this.pcm, 0);
        return this.buffer;
    }

    startPlayer = () => {
        this.startAt = WorkHands.work_index / context.sampleRate;
        this.source.start(0, this.startAt);
    }

    stopPlayer = () => {
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
            AudioHands.players[player_index].stopPlayer();
            AudioHands.players[player_index].pcm_index = temp;
            AudioHands.players[player_index].startPlayer();
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
        AudioHands.players[player_index].filter.frequency.value = temp;
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
        AudioHands.players[player_index].filter.Q.value = temp;
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
        AudioHands.players[player_index].filter.gain.value = temp;
    }
}