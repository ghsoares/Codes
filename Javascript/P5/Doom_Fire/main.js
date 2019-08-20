p5.disableFriendlyErrors = true

//array do fogo
let fire_array = []

//dimensões do fogo
const WIDTH = 64;
const HEIGHT = 64;

//tamanho do pixel
const PIXEL_SIZE = 4;

//intensidade da base
let base_intensity = 32;

//array com as cores do fogo
const FIRE_COLOR_ARRAY_1 = ['rgba(0,0,0,255)', 'rgba(19,0,0,255)', 'rgba(38,0,0,255)', 'rgba(57,0,0,255)', 'rgba(76,0,0,255)', 'rgba(95,0,0,255)', 'rgba(114,0,0,255)', 'rgba(133,0,0,255)', 'rgba(153,0,0,255)', 'rgba(172,0,0,255)', 'rgba(191,0,0,255)', 'rgba(210,0,0,255)', 'rgba(229,0,0,255)', 'rgba(248,0,0,255)', 'rgba(255,12,0,255)', 'rgba(255,30,0,255)', 'rgba(255,47,0,255)', 'rgba(255,65,0,255)', 'rgba(255,82,0,255)', 'rgba(255,99,0,255)', 'rgba(255,117,0,255)', 'rgba(255,134,0,255)', 'rgba(255,152,0,255)', 'rgba(255,169,0,255)', 'rgba(255,187,0,255)', 'rgba(255,204,0,255)', 'rgba(255,222,0,255)', 'rgba(255,239,1,255)', 'rgba(255,243,65,255)', 'rgba(255,247,128,255)', 'rgba(255,251,191,255)', 'rgba(255,255,255,255)']

//chamado quando o script é iniciado
function setup() {
    createCanvas(WIDTH * PIXEL_SIZE, HEIGHT * PIXEL_SIZE)

    initialize_fire_sctructure()
    create_base()
}

//cria a base do fogo
function create_base() {
    //largura
    for (let x = 0; x < WIDTH; x++) {
        //index do pixel
        const IDX = x + (WIDTH * (HEIGHT - 1))

        //muda a intensidade da base para este número
        fire_array[IDX] = base_intensity - 1
    }
}

//inicializa a estrutura do fogo
function initialize_fire_sctructure() {
    //tamanho do fogo
    const SIZE = WIDTH * HEIGHT;

    //preenche o array com o valor mínimo
    fire_array = Array(SIZE).fill(0)
}

/*
 * Calcula dispersão da intensidade do pixel atual dado pelo "idx"
 * @param {Number} idx O index do pixel atual
 */
function calculate_dispersion(idx) {
    //pega o index de baixo
    const bellow_index = idx + WIDTH

    //caso o index é maior que o canvas, retorna
    if (bellow_index >= WIDTH * HEIGHT) {
        return
    }

    //pega a cor
    let bellow_color = fire_array[bellow_index]

    //decaimento
    const DECAY = Math.floor(Math.random() * 3)

    //subtrai a cor
    bellow_color -= DECAY

    //limita a cor para 0
    if (bellow_color < 0) {
        bellow_color = 0
    }

    //muda o pixel atual para a nova cor
    fire_array[idx - DECAY] = bellow_color
}

//chamado todo frame e desenha na tela
function draw() {
    //posição
    let px = 0
    let py = 0

    //passa por cada pixel
    for (let idx = 0; idx < WIDTH * HEIGHT; idx++) {
        calculate_dispersion(idx)

        //pega a intensidade do pixel
        let intensity = fire_array[idx]

        //pega o index da cor no array
        let c = color(FIRE_COLOR_ARRAY_1[intensity])

        //modo de preenchimento
        fill(c)

        //sem linha
        noStroke()

        //desenha o pixel
        rect(px * PIXEL_SIZE, py * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)

        //posição
        px += 1
        if (px >= WIDTH) {
            px = 0
            py += 1
        }
    }
}