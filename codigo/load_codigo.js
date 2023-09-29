let pg_loaded = 0;

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
    hands_inst.set_pg.resetCanvas();
    moveInstance.set_canvas.resetCanvas();
}