//obstáculo
class Obstacle {
    //construtor
    constructor(speed = 10,) {
        this.body = new Rectangle(width + 16, 0, 16, 32);
        this.speed = speed;
    }

    //atualiza
    updt() {
        this.body.position.x -= this.speed;
        this.body.position.y = FLOOR_HEIGHT - 32;
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