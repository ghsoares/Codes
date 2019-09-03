/* Classe principal para animações simples */
class AnimationFunction {
    constructor(object, function_call, from, to, time) {
        /* Tempo inicial */
        this.start_time = Date.now();
        
        /* Variáveis */
        this.object = object;
        this.function_call = function_call;
        this.from = from;
        this.to = to;
        this.time = time;

        /* Inicia o loop */
        this.loop = setInterval(this.update_animation.bind(this), 0);
    }

    /* Função easing simples */
    static ease_out_quad(from, to, t) {
        return this.lerp(from, to, t * (2 - t));
    }
    /* Interpolação linear */
    static lerp(from, to, t) {
        return (1-t)*from+t*to;
    }

    /* Atualiza */
    update_animation() {
        /* Pega o frame atual */
        let current_time = Date.now();
        
        /* Porcentagem da animação */
        let percent = (current_time - this.start_time) / this.time;

        /* Limita a porcentagem para entre 0 e 1 */
        percent = Math.max(Math.min(percent, 1), 0);

        /* Valor */
        let value = AnimationFunction.ease_out_quad(this.from, this.to, percent);

        /* Chama a função */
        this.function_call(value);

        /* Detecta se a animação terminou */
        if (percent == 1) {
            this.stop_animation();
        }
    }

    /* termina a animação */
    stop_animation() {
        console.log("finished!");
        clearInterval(this.loop);
    }
}