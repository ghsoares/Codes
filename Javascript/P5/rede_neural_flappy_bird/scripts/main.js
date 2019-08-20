//modos de jogo
const GAME_MODES = {
    "PLAY": 1,
    "NEURAL": 2,
}

//tamanho da população por geração
const GENERATION_SIZE = 100;

//número de candidatos
const BEST_BIRDS = 2;

//pássaro
var bird;

//canos
var pipes = [];

//pássaros
var birds = [];

//pássaros que já morreram
var savedBirds = [];

//contagem de frames
var gameFrameCount = 0;

//modo de jogo
var game_mode = GAME_MODES.NEURAL;

//número de gerações
var generation = 0;

//slider da velocidade do jogo
var speedSlider;

//chamado quando iniciado
function setup() {
    //inicia o canvas
    createCanvas(400, 600);

    //cria o slider
    speedSlider = createSlider(1, 100, 1);

    //inicia o jogo
    restart();
}

//input
function keyPressed() {
    if (key == ' ' && game_mode == GAME_MODES.PLAY) {
        bird.fly();
    }
}

//nova população
function new_generation() {
    console.log("new_generation");

    //limpa a geração atual
    birds = [];

    //calcula os fitness de cada pássaro
    calculateFitness();

    //primeira geração
    if (frameCount == 0) {
        //para cada tamanho de geração
        for (let i = 0; i < GENERATION_SIZE; i++) {
            //adiciona um novo pássaro
            birds.push(new Bird());
        }
    } else {
        //para cada tamanho de geração
        for (let i = 0; i < GENERATION_SIZE; i++) {
            //adiciona um novo pássaro
            birds.push(pickOne());
        }

        //limpa os melhores pássaros
        savedBirds = []
    }

    generation += 1;
}

//pega um pássaro aleatório e retorna ele
function pickOne() {
    let index = 0;
    r = random(1);

    while (r > 0) {
        r = r - savedBirds[index].fitness;
        index++;
    }

    index--;

    //novo pássaro
    let child = new Bird(savedBirds[index].brain);

    //aplica mutação
    child.brain.mutate((elm) => {
        if (random(1) < 0.1) {
            let offset = randomGaussian() * 0.5;
            return elm + offset;
        } else {
            return elm;
        }
    });

    //retorna o pássaro
    return child;
}

//calcula o "fitness" (chance de ser escolhido para a próxima geração)
function calculateFitness() {
    //soma das pontuações
    var sum = 0;

    //passa por cada pássaro
    for (let i = 0; i < savedBirds.length; i++) {
        //adiciona a pontuação á soma
        sum += savedBirds[i].score;
    }

    //passa por cada pássaro
    for (let i = 0; i < savedBirds.length; i++) {
        //calcula o fitness
        savedBirds[i].fitness = savedBirds[i].score / sum;
    }
}

//reinicia o jogo
function restart() {
    //limpa todos os canos
    pipes = [];

    //adiciona o primeiro cano
    pipes.push(new Pipe())

    //reinicia os frames do jogo
    gameFrameCount = 1;

    //caso o modo de jogo é jogável
    if (game_mode == GAME_MODES.PLAY) {
        //novo pássaro
        bird = new Bird();
    } else {
        //nova geração
        new_generation();
    }
}

//chamado todo frame
function draw() {
    //parte lógica

    //passa por cada ciclo
    for (let n = 0; n < speedSlider.value(); n++) {

        //adiciona um cano de tempos em tempos
        if (gameFrameCount % 60 == 0) {
            pipes.push(new Pipe);
        }

        //passa por cada cano
        for (let i = pipes.length - 1; i >= 0; i--) {
            //atualiza
            pipes[i].pipe_updt();

            if (game_mode == GAME_MODES.PLAY) {
                //verifica se o pássaro colidiu com este cano
                if (pipes[i].bird_collided(bird)) {
                    restart();
                    return
                }
            } else {
                //passa por cada pássaro
                for (let j = birds.length - 1; j >= 0; j--) {

                    //detecta colisão com este pássaro
                    if (pipes[i].bird_collided(birds[j])) {
                        //adiciona o pássaro removido ao array de pássaros salvados
                        savedBirds.push(birds.splice(j, 1)[0]);

                        //todos os pássaros morreram
                        if (birds.length == 0) {
                            restart();
                            return;
                        }
                    }
                }
            }

            //elimina o cano caso saia da tela
            if (pipes[i].pos.x < -pipes[i].w) {
                pipes.splice(i, 1);
            }
        }
        if (game_mode == GAME_MODES.PLAY) {
            //o pássaro "pensa"
            bird.think(pipes);

            //atualiza o pássaro
            bird.bird_updt();
        }

        //passa por cada pássaro
        for (let i = birds.length - 1; i >= 0; i--) {
            //este pássaro "pensa"
            birds[i].think(pipes);

            //atualiza o pássaro
            birds[i].bird_updt();
        }

        //adiciona um frame na contagem
        gameFrameCount += 1;

    }

    //parte gráfica
    background(0);

    //passa por cada pássaro
    for (let i = 0; i < birds.length; i++) {
        birds[i].render();
    }

    //passa por cada cano
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].render();
    }
}