//classe do relógio
var clock

//gradiente de plano de fundo
var backGrad

//tempo atual
var actualTime

//chamado quando o programa inicia
function setup() {
    //cria o canvas
    createCanvas(windowWidth, windowHeight)

    setupClock()

    //cria o gradiente
    backGrad = new Gradient

    //muda o tempo atual
    actualTime = (second()) + (minute() * 60) + (hour() * 60 * 60)

    //adiciona as cores
    createBackgroundGradient()
}

//cria o gradiente do plano de fundo
function createBackgroundGradient() {
    backGrad.addColor(color(0, 6, 65), 0.0)
    backGrad.addColor(color(255, 137, 0), 0.15)
    backGrad.addColor(color(0, 231, 255), 0.35)
    backGrad.addColor(color(0, 231, 255), 0.65)
    backGrad.addColor(color(255, 137, 0), 0.85)
    backGrad.addColor(color(0, 6, 65), 1.0)
}

//cria o relógio
function setupClock() {
    //posição
    var pos = createVector(windowWidth / 2, windowHeight / 2)

    //raio
    var radius = 256

    //larguras dos arcos de cada tempo
    // [segundo, minuto, hora]
    var strokesWidths = [16.0, 12.0, 8.0]

    //espaçamento entre cada arco
    var spacing = 8.0

    //cores
    // [segundo, minuto, hora]
    var colors = ['rgba(55, 55, 255, 255)', 'rgba(55, 255, 55, 255)', 'rgba(255, 55, 55, 255)']

    //velocidade de interpolação entre o ângulo do tempo atual
    //e do ângulo do arco
    var interpolationSpeed = 0.05

    //cria o relógio
    clock = new Clock(radius, strokesWidths, spacing, colors, interpolationSpeed, true)
}

//desenha
function draw() {
    //adiciona o tempo atual
    actualTime += deltaTime / 1000.0

    //caso o tempo atual é maior que 86400 (segundos em um dia),
    //o tempo atual é 0
    if (actualTime >= 86400) {
        actualTime = 0
    }

    //pega o tempo (em horas) para definir a cor de fundo
    var interpAmnt = map(actualTime, 0, 86499, 0, 1)

    //pega a cor
    var color = backGrad.interpolate(interpAmnt)

    //plano de fundo
    background(color)

    //posição
    translate(windowWidth / 2, windowHeight / 2)

    //atualiza o relógio
    clock.clockUpdate()

    //renderiza o relógio
    clock.render()
}