window.onload = () => {
    let pre_destroy = setInterval(() => {
        destroy_content.runDestruction();
    }, 1);
    setTimeout(() => {
        document.getElementById("cover").style.display = "none";
        clearInterval(pre_destroy);
    }, 2000);
    setTimeout(() => {
        setHeader.runAnimation();
        loadDestruction();
    }, 3000);
    setInterval(() => {
        reDestroy();
    }, 60000);
}

function loadDestruction() {
    setDestruction.getElements();
}

function reDestroy() {
    let re_destroy = setInterval(() => {
        destroy_content.runDestruction();
    }, 1);
    setTimeout(() => {
        clearInterval(re_destroy);
    }, 10000);
    destroy_content.Elt.elements.forEach((e) => {
        destroy_content.destroyPosition(e);
    });
    destroy_content.Elt.text.forEach((e) => {
        destroy_content.destroyPosition(e);
    });
    
}