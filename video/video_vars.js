///////////////////////////////////////////////////////////////////////////////////////////
// MENU VARIABLES
///////////////////////////////////////////////////////////////////////////////////////////

const Gif = {
    paths: [
        "./video/data/gif/terrorGif.mp4",
        "./video/data/gif/naoGif.mp4",
        "./video/data/gif/monkGif.mp4",
        "./video/data/gif/eqGif.mp4",
        "./video/data/gif/flautaGif.mp4",
        "./video/data/gif/estampaGif.mp4"
    ],
    gif: []
};

const Menu = {
    content_container: document.getElementById("content_container"),
    menu_container: undefined,
    canvas: undefined,
    title_container: undefined,
    titles: [],
    to_screen: undefined,
    menu_obj: undefined,
    run_gif: false,
    video_obj: []
}

const menuBackground = `Parece que o vídeo, como a música, não é apenas articulado e despendido no tempo (como o filme), mas sim que toda sua substância pode ser classificada em termos de temporalidade, ritmo, frequência. A varredura de vídeo lembra um tipo de estêncil métrico, ostinato, batida do coração. O quadro do vídeo não é um retângulo. É uma forma ameboide degenerada se passando por retângulo para acomodar a programação barata dos cines corujões. A primeira imagem de vídeo que vi, em um pequeno tubo de raios catódicos sobre uma mastaba de um metro de altura, era circular. As inconclusões da videoarte onde cheguei mais perto de momentos de verdadeira descoberta e peripeteia parecem exibir, mais frequentemente, um tropismo rumo a um tipo (ou muitos tipos) de simultaneidade metamórfica. (Neste aspecto, o vídeo se assemelha ao mito ovidiano). A arte do filme, soberanamente cômoda em espaços profundos, tanto visuais quanto aurais, precisa de uma invenção intrincada para escapar do ‘plano frontal’ da temporalidade — um aspecto que se pretende nem imperfectivo nem perfectivo, mas Absoluto. Já o vídeo, imanentemente gráfico, polemicamente anti-ilusionista, alcança o equilíbrio espaço-temporal através de uma dissolução, uma fluidificação, de todos os segmentos daquela unidade temporal chamada por nós de Eternidade, rumo a uma versão mal passada do Era Uma Vez. Os procedimentos da maioria das artes equivalem a motores térmicos; filme e vídeo primeiro levam a energia ao ponto mais alto da escala entrópica. Fótons imprimem sobre um delírio aleatório de cristais de halogeneto de prata imersos na emulsão fílmica uma ilusão de ordem; elétrons distorcem a varredura ordenada do vídeo, precisa como uma treliça de cristal, em uma ilusão de delírio.`;

const videoTitle = [
    "FILME DE TERROR",
    "NÃO",
    "SORT( ) MONK",
    "EQUAÇÕES",
    "FLAUTA-VÉRTEBRA",
    "ESTAMPA"
];

///////////////////////////////////////////////////////////////////////////////////////////
// TERROR
///////////////////////////////////////////////////////////////////////////////////////////

const VideoTerror = {
    title: "FILME DE TERROR",
    subtitle: [
        "FPS",
        "DESCOBRIMENTO",
        "PESTE",
        `PRECEDENTES <div id="precedentes_terror"/></div>`
    ],
    videoPath: [
        "./video/data/mp4/fps.mp4",
        "./video/data/mp4/descobrimento.mp4",
        "./video/data/mp4/peste.mp4",
        "./video/data/mp4/sobreAmerica.mp4",
        "./video/data/mp4/band.mp4",
    ],
    audioPath: [
        "./video/data/mp3/terrorAudio_0.mp3"
    ],
    order: [
        "title",
        "text",
        "subtitle",
        "video",
        "text",
        "subtitle",
        "video",
        "text",
        "subtitle",
        "video",
        "audio",
        "text",
        "subtitle",
        "text",
        "video",
        "video",
        "text"
    ],
    text: [
        [
            `<i>Macbeth</i> <br>
            como um <i>Ricardo III</i> da maturidade <br> <br>
            vídeo <br>
            a partir da subtração de frames consecutivos <br> <br>
            a sobreposição dá lugar ao descascamento da imagem <br>
            a ideia de composição (vide <a class="a_text" href="#precedentes_terror">PRECEDENTES</a>) <br>
            que tinha como objetivo uma espacialidade contínua <br>
            é substituída pela colagem fragmentária <br> <br>
            perspectiva <br>
            proporção <br>
            coerência motora <br> 
            (as partes se movimentando em uníssono) <br>
            são descartadas`
        ],
        [
            `passado — passado recente — presente <br>
            processo de definição da violência <br>
            de <i>Doom</i> a <i>Call of Duty</i> <br>
            de Tróia a Bagdá <br>
            não no sentido de desenvolvimento "técnico" <br>
            mas de condensação de uma história de violência <br>
            difusa para a memória coletiva`
        ],
        [
            `cena da guerra de <i>Macbeth</i> <br>
            o permanente estado de 'descobrimento' <br>
            redescoberta <br>
            Filme de Terror <br>
            (vide <a href="./texto.html" class="a_text">ROTEIRO DE FILME DE TERROR</a>) <br> <br>
            invasão portuguesa <br>
            escravidão <br>
            canudos <br>
            integralismo <br>
            estado novo <br>
            seca <br>
            ditadura <br>
            carandiru <br>
            violência policial <br>
            invasão brasileira`
        ],
        [
            `cena das bruxas de Macbeth <br>
            bixos escrotos e família tradicional <br> <br>
            áudio de pastores evangélicos diabólicos`
        ],
        [
            `sobreposição aleatória <br>
            de imagens e vídeos latino-americanos <br> <br>
            Sobre América <br>
            Obama ordenou: Estamos Unidos <br> <br>
            2019`
        ],
        [
            `entre-frames <br>
            contornos para montagem <br> <br>
            rasura <br>
            sobreposição <br>
            composição <br>
            desenho <br> <br>
            quem foi Olavo Cadáver <br>
            perto do Datena <br>
            na formação e radicalização <br>
            da mais nova onda fascista brasileira? <br> <br>
            2020`
        ]
    ]
}

///////////////////////////////////////////////////////////////////////////////////////////
// NÃO
///////////////////////////////////////////////////////////////////////////////////////////

const VideoNao = {
    title: "NÃO",
    subtitle: [],
    videoPath: [
        "./video/data/mp4/nao.mp4"
    ],
    audioPath: [],
    order: [
        "title",
        "video",
        "text"
    ],
    text: [
        [
            `filmado com uma câmera de celular quebrada <br> <br>
            o <b>NÃO</b> de uma placa do metrô <br>
            (linha amarela — SP) <br>
            periodicamente iluminada <br>
            pelas luzes do túnel`
        ]
    ]
}

///////////////////////////////////////////////////////////////////////////////////////////
// SORT( ) MONK
///////////////////////////////////////////////////////////////////////////////////////////

const VideoMonk = {
    title: "SORT( ) MONK",
    subtitle: [],
    videoPath: [
        "./video/data/mp4/monk.mp4"
    ],
    audioPath: [
        "./video/data/mp3/monkAudio_0.mp3"
    ],
    order: [
        "title",
        "video",
        "audio",
        "text"
    ],
    text: [
        [
            `<i>Ruby, My Dear</i> <br>
            Thelonious Monk <br> <br>
            função Array.prototype.sort() do javascript <br>
            mas regulada por alguma equação <br> <br>
            algo como: <br>
            reordene o conjunto de dados <br>
            em valores ascendentes <br>
            conforme  <br>
            o resultado do cosseno de um dado <i>n</i> <br>
            dividido pelo seno de cada um dos demais <br> <br>
            aqui o vídeo é secundário <br>
            o que importa é o áudio <br>
            que aponta para outras trilhas`
        ]
    ]
}

///////////////////////////////////////////////////////////////////////////////////////////
// EQUAÇÕES
///////////////////////////////////////////////////////////////////////////////////////////

const VideoEq = {
    title: "EQUAÇÕES",
    subtitle: [
        "SEM TÍTULO",
        "MOEDAPOEMA"
    ],
    videoPath: [
        "./video/data/mp4/eq.mp4",
        "./video/data/mp4/moedaPoema.mp4"
    ],
    audioPath: [],
    order: [
        "title",
        "subtitle",
        "video",
        "text",
        "subtitle",
        "video",
        "text"
    ],
    text: [
        [
            `equação matemática <br>
            f(x, y) <br>
            onde x e y são coordenadas do quadro de pixels <br> <br>
            mesmo código usado nas serigrafias <br>
            (vide <a href="./serigrafia.html" class="a_text">SERIGRAFIA</a>) <br> <br>
            aqui <br>
            as variáveis se movimentando: <br>
            x <br>
            y <br>
            e outras complementares`
        ],
        [
            `uso de equações <br>
            para determinar o posicionamento de palavras <br> <br>
            <i>poema</i> e <i>moeda</i> sendo quase anagramas <br>
            <i>d</i> e <i>p</i> anagramas visuais <br> <br>
            no exemplo: <br>
            (para cada pixel: <br>
            n = sqrt(x^2 + y^2) <br>
            m = 10 <br>
            se n > m -> cor preta <br>
            se n < m -> cor branca) <br> <br>
            ocorre a seguinte alteração: <br>
            se n > m -> coordenada (x, y) de <i>poema</i> <br>
            se n < m -> coordenada (x, y) de <i>moeda</i> <br> <br>
            & (por ser vídeo) <br> <br>
            n <br>
            m <br>
            e variáveis complementares <br>
            se movimentam <br>`
        ]
    ]
}

///////////////////////////////////////////////////////////////////////////////////////////
// FLAUTA=VÉRTEBRA
///////////////////////////////////////////////////////////////////////////////////////////

const VideoMaiakovski = {
    title: "FLAUTA-VÉRTEBRA",
    subtitle: [],
    videoPath: [
        "./video/data/mp4/flautaVertebra.mp4"
    ],
    audioPath: [],
    order: [
        "title",
        "video",
        "text",
        "text"
    ],
    text: [
        [
            `A FLAUTA-VÉRTEBRA <br>
            <i>Prólogo</i> <br> <br>
            A todas vocês, <br>
            que eu amei e que eu amo, <br>
            ícones guardados num coração-caverna, <br>
            como quem num banquete ergue a taça e celebra, <br>
            repleto de versos levanto meu crânio. <br> <br>
            Penso, mais de uma vez: <br>
            seria melhor talvez <br>
            pôr-me o ponto final de um balaço. <br>
            Em todo caso <br>
            eu <br>
            hoje vou dar meu concerto de adeus. <br> <br>
            Memória! <br>
            Convoca aos salões do cérebro <br>
            um renque inumerável de amadas. <br>
            Verte o riso de pupila em pupila, <br>
            veste a noite de núpcias passadas. <br>
            De corpo a corpo verta a alegria. <br>
            Esta noite ficará na História. <br>
            Hoje executarei meus versos <br>
            na flauta de minhas próprias vértebras. <br> <br>
            1915 <br> <br>
            <i>(Tradução de Haroldo de Campos e Boris Schnaiderman)</i>`
        ],
        [
            `vídeo feito no Pure Data <br>
            com um objeto que escreve bytes <br>
            em um arquivo genérico <br>
            [mr.peach/binfile] <br> <br>
            revesamento de informações RGB <br>
            de um vídeo em branco e de imagens <br>
            todos descompactados <br> <br>
            porém <br>
            omitindo ou repetindo linhas aleatoriamente <br>
            para a extrapolação dos limites do quadro <br> <br>
            primeiro vídeo com auxílio do computador`
        ]
    ]
}

///////////////////////////////////////////////////////////////////////////////////////////
// ESTAMPA
///////////////////////////////////////////////////////////////////////////////////////////

const VideoEstampa = {
    title: "ESTAMPA",
    subtitle: [],
    videoPath: [
        "./video/data/mp4/bruxa.mp4",
        "./video/data/mp4/estampa.mp4"
    ],
    audioPath: [],
    order: [
        "title",
        "video",
        "text",
        "video"
    ],
    text: [
        [
            `código para mudar a resolução de um vídeo <br>
            e <br>
            reduzir as cores por meio de retículas <br> <br>
            pesquisa de estampa <br>`
        ]
    ]
}

///////////////////////////////////////////////////////////////////////////////////////////
// VIDEO COLLECTION
///////////////////////////////////////////////////////////////////////////////////////////

const VideoItems = [
    VideoTerror,
    VideoNao,
    VideoMonk,
    VideoEq,
    VideoMaiakovski,
    VideoEstampa
]