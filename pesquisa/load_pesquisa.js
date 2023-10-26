Head.curr_pg = 12;

window.onload = () => {
    let pre_destroy = setInterval(() => {
        ResF.setDestruction();
    }, 1);
    setTimeout(() => {
        clearInterval(pre_destroy);
        document.getElementById("cover").style.display = "none";
    }, 2000);
    setTimeout(() => {
        HeadF.initHead();
    }, 3000);
    setTimeout(() => {
        runHeader();
        DtF.getElt();
    }, 4000);
}

runHeader = () => {
    HeadF.clickRed();
    HeadF.animLinks();
    HeadF.animInfo();
}