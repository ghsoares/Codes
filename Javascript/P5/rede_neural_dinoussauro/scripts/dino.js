//classe principal do dino
class Dino {
    constructor() {
        this.body = new Rectangle(128, height / 2, 16, 32);
        
        //gravidade
        this.gravity = 1;

        //velocidade de queda
        this.fall_speed = 0

        //força do pulo
        this.jump_force = 20;
    }

    //atualiza
    think(obstacles) {
        //aplica gravidade
        this.fall_speed += this.gravity;

        //move o dinossauro
        this.body.position.y += this.fall_speed;

        //limita a posição vertical
        if (this.body.position.y > FLOOR_HEIGHT - this.body.size.y) {
            this.body.position.y = FLOOR_HEIGHT - this.body.size.y;
            this.fall_speed = 0;
        }
    }

    //está no chão
    is_on_floor() {
        if (this.body.position.y + this.body.size.y >= FLOOR_HEIGHT) {
            return true;
        }
        return false
    }

    //pula
    jump() {
        //verifica se está no chão
        if (this.is_on_floor()) {
            //aplica velocidade
            this.fall_speed = -this.jump_force;
        }
    }

    //aplica velocidade para baixo
    down() {
        this.fall_speed += this.gravity * 1.1;
    }

    //renderiza
    render() {
        noStroke();
        fill(255);
        rect(this.body.position.x,
            this.body.position.y,
            this.body.size.x,
            this.body.size.y
        );
    }
}