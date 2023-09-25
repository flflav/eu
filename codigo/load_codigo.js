window.onload = () => {
    setTimeout(() => {
        document.getElementById("cover").style.display = "none";
    }, 2000);
    setTimeout(() => {
        setHeader.runAnimation();
        loadDestruction();
    }, 3000);
}

function loadDestruction() {
    setDestruction.getElements();
}

window.onresize = () => {
    handsInstance.set_canvas.resetCanvas();
    moveInstance.set_canvas.resetCanvas();
}