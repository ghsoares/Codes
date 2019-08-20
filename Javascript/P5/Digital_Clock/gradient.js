/*
    Classe para criar gradientes de múltiplas cores
    e interpolá-las
*/

//classe principal
class Gradient {
    //cria o objeto
    constructor() {
        //cria as cores
        this.colors = []

        //cria os offsets
        this.offsets = []
    }

    //adiciona uma cor num offset (0.0 - 1.0)
    addColor(color = color(255), offset = 0.0) {
        this.colors.push(color)
        this.offsets.push(offset)
    }

    //retorna uma cor interpolada
    interpolate(offset = 0.25) {
        //caso o número de offsets é zero, retorna uma cor preta
        if (this.offsets.lenght === 0) {
            return color(0)
        }

        //limita o offset entre 0.0 e 1.0
        offset = clamp(offset, 0, 1)

        //cores
        var c1
        var c2

        //offsets
        var of1 = 0.0
        var of2 = 0.0

        //passa por cada offset
        for (var idx = 0; idx < this.offsets.length; idx++) {
            //caso o offset é maior que o offset interado,
            //pega a cor e offset
            if (offset > this.offsets[idx]) {
                c1 = this.colors[idx]
                of1 = this.offsets[idx]
            }
            //index revertido (ao invés de ser 0 - n, vai ser n - 0)
            var rIdx = (this.offsets.length - 1) - idx

            //caso o offset é menor que o offset interado,
            //pega a cor e offset
            if (offset < this.offsets[rIdx]) {
                c2 = this.colors[rIdx]
                of2 = this.offsets[rIdx]
            }
        }

        //quantidade de interpolação
        var int = map(offset, of1, of2, 0, 1)

        //interpola
        return lerpColor(c1, c2, int)
    }
}