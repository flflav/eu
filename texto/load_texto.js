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

function textDestruction() {
    let subtitle = document.getElementsByClassName("subtitle");
    let text = document.getElementsByClassName("text");
    let line = document.getElementsByClassName("subtitle_line");
    setInterval(() => {
        subtitle[randomInt(0, subtitle.length)].style.lineHeight = "var(--lineHeight)";
    }, randomInt(2000, 5000));
    setInterval(() => {
        text[randomInt(0, text.length)].style.lineHeight = "var(--lineHeight)";
        text[randomInt(0, text.length)].style.opacity = "1";
    }, randomInt(2000, 5000));
    setInterval(() => {
        line[randomInt(0, line.length)].style.height = "var(--textMargin)";
    }, randomInt(2000, 4500));
}