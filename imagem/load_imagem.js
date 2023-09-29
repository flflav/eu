window.onload = () => {
    setTimeout(() => {
        setHeader.runAnimation();
        loadDestruction();
    }, 3000);
}

function loadDestruction() {
    setDestruction.getElements();
}

window.onresize = () => {
    Screen.canvas_obj.resetCanvas();
}