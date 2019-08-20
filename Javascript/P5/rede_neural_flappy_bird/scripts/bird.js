//classe principal do pássaro
class Bird {
    //construtor
    constructor(brain = null) {
        //posição
        this.pos = createVector(width / 4, height / 2);

        //velocidade vertical
        this.velocity = 0.0;

        //gravidade
        this.gravity = 0.98;

        //força do voo
        this.fly_force = 10.0;

        //raio do pássaro
        this.radius = 24;

        //cor do pássaro
        this.color = 'hsl({h}, {s}, {l})';
        this.color = this.color.replace("{h}", str(round(random(0, 255))));
        this.color = this.color.replace("{s}", "100%");
        this.color = this.color.replace("{l}", "50%");
        this.color = color(this.color);


        //cérebro
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 1);
        }

        //pontuação do pássaro (quão longe chegou)
        this.score = 0;

        //fitness (probabilidade de ser escolhido para a próxima geração)
        this.fitness = 0.0;
    }

    //o pássaro "pensa" (ou seja, recebe inputs, gerando outputs e fazendo
    //uma ação de acordo com este output)
    think(pipes) {
        //o cano mais próximo
        let next_pipe = null;

        //distância do cano mais próximo
        let next_pipe_dist = 0.0;

        //passa por cada cano
        for (let i = 0; i < pipes.length; i++) {
            //distância
            let d = (pipes[i].pos.x + pipes[i].w) - this.pos.x;

            //caso a distância é negativa, é irrelevante
            if (d < 0) {
                continue;
            }
            //caso ainda não tenha o cano mais próximo, atribui a ele o cano atual
            if (!next_pipe) {
                next_pipe = pipes[i];
                next_pipe_dist = d;
                continue;
            }
            //caso a distância é menor que a distância do cano mais próximo atual, atribui o cano atual
            if (d < next_pipe_dist) {
                next_pipe = pipes[i];
                next_pipe_dist = d;
            }
        }

        //inputs (cinco inputs:
        //          altura atual;
        //          distância até o próximo cano;
        //          distância até a altura da abertura do próximo cano;
        //          largura do cano;
        //          e o tamanho da abertura do próximo cano)
        var inputs = [undefined, undefined, undefined, undefined, undefined];

        //--altura atual--
        inputs[0] = this.pos.y;

        //--distância até o próximo cano--
        inputs[1] = next_pipe_dist;

        if (next_pipe) {
            //--distância até a altura da abertura do próximo cano--
            inputs[2] = next_pipe.gap_pos - this.pos.y;

            //--largura do próximo cano--
            inputs[3] = next_pipe.w;

            //--tamanho da abertura do próximo cano--
            inputs[4] = next_pipe.gap_size;
        } else {
            //--distância até a altura da abertura do próximo cano--
            inputs[2] = -1;

            //--largura do próximo cano--
            inputs[3] = -1;

            //--tamanho da abertura do próximo cano--
            inputs[4] = -1;
        }
        

        //pega o output
        let output = this.brain.feedForward(inputs);

        //caso o primeiro output é maior que 0.5, aplica o voo
        if (output.data[0][0] > 0.5) {
            this.fly();
        }
    }

    //atualiza o pássaro
    bird_updt() {
        //aplica gravidade
        this.velocity += this.gravity;

        //aplica motion
        this.pos.y += this.velocity;

        //limita posição
        // this.pos.y = max(min(this.pos.y, height), 0.0)
        if (this.pos.y < 0) {
            this.pos.y = 0;
        } else if (this.pos.y > height) {
            this.pos.y = height;
            this.velocity = 0;
        }

        //aumenta a pontuação
        this.score++;
    }

    //aplica voo
    fly() {
        this.velocity = -this.fly_force;
    }

    //renderiza o pássaro
    render() {
        fill(this.color);
        stroke(255);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
}