Head.curr_pg = 4;

window.onload = () => {
    setTimeout(() => {
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

window.onresize = () => {
    HandsF.resizeCnv();
    MoveF.resizeCnv();
}