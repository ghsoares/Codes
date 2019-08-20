//dinos
let dinos = [];

//dinos salvos
let savedDinos = [];

//altura do chão
let FLOOR_HEIGHT = 0;

//obstáculos
let obstacles = [];

//número de ciclos
let cicles = 1;

//velocidade do jogo
let game_speed = 10;

//frames do jogo
let game_frames = 0;

//chamado quando iniciado
function setup() {
    createCanvas(windowWidth, windowHeight);
    dinos.push(new Dino());
    obstacles.push(new Obstacle(game_speed));

    FLOOR_HEIGHT = height / 1.5;
}

//chamado todo frame
function draw() {
    //plano de fundo
    background(0);

    //define a cor de preenchimento
    fill(255);

    //sem linha de contorno
    noStroke();

    //desenha o chão
    rect(0, FLOOR_HEIGHT, width, height - FLOOR_HEIGHT);

    //passa por cada ciclo
    for (let i = 0; i < cicles; i++) {
        //adiciona um no frame
        game_frames++;

        //novo obstaculo
        if (game_frames % 60 === 0) {
            obstacles.push(new Obstacle(game_speed));
        }

        //passa por cada obstáculo
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].updt();
            //caso o obstáculo saiu da tela
            if (obstacles[i].body.position.x < -obstacles[i].body.size.x) {
                obstacles.splice(i, 1);
                continue;
            }

            //passa por cada dino
            for (let i = 0; i < dinos.length; i++) {
                //verifica se o dino colidiu com o obstáculo
                if (Rectangle.intersect(dinos[i].body, obstacles[i].body)) {
                    //savedDinos.push(dinos.splice(i, 1));
                }
            }
        }
        
        //passa por cada dino
        for (dino of dinos) {
            dino.think(obstacles);
        }

    }

    //passa por cada dino
    for (dino of dinos) {
        dino.render();
    }

    //passa por cada obstáculo
    for (obs of obstacles) {
        obs.render();
    }
}