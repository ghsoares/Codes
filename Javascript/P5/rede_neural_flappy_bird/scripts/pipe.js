//classe principal do cano
class Pipe {
    //construtor
    constructor() {
        //posição da abertura
        this.gap_pos = random(64, height - 64);

        //largura do cano
        this.w = 64;

        //tamanho da abertura
        this.gap_size = random(48, 64);

        //posição
        this.pos = createVector(width + this.w, 0);

        //velocidade
        this.velocity = 4;

        //altura do cano de cima
        this.up_height = this.gap_pos - this.gap_size;

        //altura do cano de baixo
        this.down_height = height - this.gap_pos + this.gap_size;
    }

    //detecta se o pássaro colidiu com esse cano
    bird_collided(bird) {
        //pela altura do pássaro
        if (bird.pos.y - bird.radius / 2 < this.up_height || bird.pos.y + bird.radius / 2 > this.gap_pos + this.gap_size) {
            //pela posição horizontal do pássaro
            if (abs(bird.pos.x - this.pos.x) < bird.radius / 2 || abs(bird.pos.x - (this.pos.x + this.w)) < bird.radius / 2) {
                //colidiu
                return true;
            }
        }
        return false
    }

    //atualiza
    pipe_updt() {
        //aplica velocidade
        this.pos.x -= this.velocity;
    }

    //renderiza o cano
    render() {
        fill(255);
        noStroke();        

        //desenha o primeiro cano
        rect(this.pos.x, this.pos.y, this.w, this.up_height);

        //desenha o segundo cano
        rect(this.pos.x, this.gap_pos + this.gap_size, this.w, this.down_height);
    }
}