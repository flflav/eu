function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomIntInc(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function constrainVal(val, min, max) {
    return (val < min) ? min : ((val > max) ? max : val);
}

function shuffleArray(arr) {
    let temp_arr;
    let j;
    let i = arr.length - 1;
    while (i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp_arr = arr[i];
        arr[i] = arr[j];
        arr[j] = temp_arr;
        i--;
    }
    return arr;
}

function scaleVal(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}