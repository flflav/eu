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
    Menu.menu_obj.resetCanvas();
}