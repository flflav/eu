const cont = document.getElementById("content_container");
const words = [
    "serigrafia",
    "vídeo",
    "código",
    "imagem",
    "texto",
    "tradução",
    "pesquisa"
];
const num_words = words.length * 30;
let span = [];

let w = 0;
let i = 0;
while (i < num_words) {
    span.push(document.createElement("span"));
    span.at(-1).innerHTML = words[w];
    span.at(-1).style.opacity = `${Math.random()}`;
    cont.appendChild(span.at(-1));
    w++;
    if (w == words.length) w = 0;
    i++;
}