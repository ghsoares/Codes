class Clock {
    //constrói o objeto
    constructor(radius, strokesWidths, spacing, colors, timeInterpolationSpeed, pointers = false, pointersScale = 0.2) {
        //inicializa as propriedades
        this.radius = radius
        this.spacing = spacing
        this.colors = colors
        this.interpolationSpeed = timeInterpolationSpeed
        this.pointers = pointers

        //cria os ponteiros e arcos interiores
        // [raio, largura da linha, ângulo]
        this.seconds = [(radius - strokesWidths[0]) - spacing * 2 - strokesWidths[2] * 2 - strokesWidths[1] * 2, strokesWidths[0], 0]
        this.minutes = [(radius - strokesWidths[1]) - spacing - strokesWidths[2] * 2, strokesWidths[1], 0]
        this.hours = [radius - strokesWidths[2], strokesWidths[2], 0]

        //cria os ponteiros
        this.secondsPointer = ((radius - strokesWidths[0]) - spacing * 2 - strokesWidths[2] * 2 - strokesWidths[1] * 2) * pointersScale
        this.minutesPointer = ((radius - strokesWidths[1]) - spacing - strokesWidths[2] * 2) * pointersScale
        this.hoursPointer = (radius - strokesWidths[2]) * pointersScale

        //chama a função de inicialização
        this._ready()
    }

    //chamado quando iniciado (privado)
    _ready() {

    }

    //atualiza (público)
    clockUpdate() {
        //pega o tempo atual
        let actualHours = map(hour(), 0, 23, 0.01, TWO_PI)
        let actualMinutes = map(minute(), 0, 59, 0.01, TWO_PI)
        let actualSeconds = map(second(), 0, 59, 0.01, TWO_PI)

        //interpolação simples
        this.hours[2] += (actualHours - this.hours[2]) / (1 / this.interpolationSpeed)
        this.minutes[2] += (actualMinutes - this.minutes[2]) / (1 / this.interpolationSpeed)
        this.seconds[2] += (actualSeconds - this.seconds[2]) / (1 / this.interpolationSpeed)
    }

    //renderiza o relógio (público)
    render() {
        //rotaciona
        rotate(-HALF_PI)

        //sem preenchimento
        noFill()

        //renderização das horas
        //cor do arco
        stroke(color(this.colors[2]))

        //largura do arco
        strokeWeight(this.hours[1])

        //desenha o arco
        arc(0, 0, this.hours[0], this.hours[0], 0, this.hours[2])

        //caso tiver ponteiros, renderiza os ponteiros
        if (this.pointers) {
            //posição final do ponteiro
            var finalPos = createVector(this.hoursPointer, this.hoursPointer)

            //gira a posição final
            finalPos.x *= cos(this.hours[2])
            finalPos.y *= sin(this.hours[2])

            //desenha a linha
            line(0, 0, finalPos.x, finalPos.y)
        }

        //renderização dos minutos
        //cor do arco
        stroke(color(this.colors[1]))

        //largura do arco
        strokeWeight(this.minutes[1])

        //desenha o arco
        arc(0, 0, this.minutes[0], this.minutes[0], 0, this.minutes[2])

        //caso tiver ponteiros, renderiza os ponteiros
        if (this.pointers) {
            //posição final do ponteiro
            var finalPos = createVector(this.minutesPointer, this.minutesPointer)

            //gira a posição final
            finalPos.x *= cos(this.minutes[2])
            finalPos.y *= sin(this.minutes[2])

            //desenha a linha
            line(0, 0, finalPos.x, finalPos.y)
        }

        //renderização dos segundos
        //cor do arco
        stroke(color(this.colors[0]))

        //largura do arco
        strokeWeight(this.seconds[1])

        //desenha o arco
        arc(0, 0, this.seconds[0], this.seconds[0], 0, this.seconds[2])

        //caso tiver ponteiros, renderiza os ponteiros
        if (this.pointers) {
            //posição final do ponteiro
            var finalPos = createVector(this.secondsPointer, this.secondsPointer)

            //gira a posição final
            finalPos.x *= cos(this.seconds[2])
            finalPos.y *= sin(this.seconds[2])

            //desenha a linha
            line(0, 0, finalPos.x, finalPos.y)

            //desenha um círculo final
            fill(255)
            noStroke()

            //pega a maior largura entre os ponteiros
            var biggerWidth = this.seconds[1]

            if (this.minutes[1] >= biggerWidth) {
                biggerWidth = this.minutes[1]
            }
            if (this.hours[1] >= biggerWidth) {
                biggerWidth = this.hours[1]
            }

            //desenha o círculo
            ellipse(0, 0, biggerWidth + 1, biggerWidth + 1)
        }
    }
}