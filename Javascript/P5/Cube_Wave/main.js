//ângulo
let angle = 0

//largura
let w = 20

let ma

//chamado quando o script é inicializado
function setup() {
    createCanvas(400, 400, WEBGL)
    ma = atan(1/sqrt(2))
}

//desenha
function draw() {
    background(100)
    ortho()

    translate(0, 50, -50)

    rotateX(-QUARTER_PI)
    rotateY(ma)

    let offset = 0.0
    for (let z = 0; z < height; z += w) {
        for (let x = 0; x < width; x += w) {
            push()
            let a = angle + offset
            let h = map(sin(a), -1, 1, 0, 100)

            translate(x - width / 2, 0, z - height / 2)

            normalMaterial()

            box(w - 2, h, w - 2)

            
            pop()
        }
        offset += 0.1
    }

    angle += 0.1
}