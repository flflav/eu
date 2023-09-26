class WorkletHands extends AudioWorkletProcessor {
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
            this.port.postMessage(input[0][0]);
            // let i = 0;
            // while (i < input[0][0].length) {
            //     this.port.postMessage(input[0][0][i]);
            //     i++;
            // }
        } else {
            this.port.postMessage("end");
            return false;
        }
        return true;
    }
}
registerProcessor("worklet_h", WorkletHands);