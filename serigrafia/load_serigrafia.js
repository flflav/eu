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
    setMenu.gallery_objs.forEach((e) => {
        e.Gallery.images.forEach((f, j) => {
            let style = window.getComputedStyle(f);
            let h = style.getPropertyValue("height");
            e.Gallery.button_containers[j].style.height = `${h}`;
        });
        if (e.isOpen) {
            let Options = {
                duration: 500,
                fill: "forwards",
                easing: "ease-in-out",
                direction: "normal"
            }
            let style = window.getComputedStyle(e.Gallery.gallery);
            let h = style.getPropertyValue("height");
            let Keyframes = [
                {
                    height: `${e.Gallery.container.getBoundingClientRect().height}px`
                },
                {
                    height: `${h}`
                }
            ];
            e.Gallery.container.animate(Keyframes, Options);
        }
    });
    if (Zoom.isOpen) {
        let imageRect = Zoom.image.getBoundingClientRect();
        let wDiff = Math.abs(window.innerWidth - imageRect.width);
        let hDiff = Math.abs(window.innerHeight - imageRect.height);
        if (wDiff < hDiff) {
            Zoom.image.style.width = "90vw";
            Zoom.image.style.height = "auto";
        } else {
            Zoom.image.style.height = "90vh";
            Zoom.image.style.width = "auto";
        }
    }
}

window.onscroll = () => { 
    colorImage() 
};