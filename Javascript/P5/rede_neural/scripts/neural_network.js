//classe principal da rede neural
class NeuralNetwork {
    //construtor
    constructor(n_input_nodes, n_hidden_nodes, n_output_nodes) {
        this.n_i_nodes = n_input_nodes;
        this.n_h_nodes = n_hidden_nodes;
        this.n_o_nodes = n_output_nodes;

        this.bias_i_h = new Matrix(this.n_h_nodes, 1);
        this.bias_h_o = new Matrix(this.n_o_nodes, 1);

        this.bias_i_h.randomize();
        this.bias_h_o.randomize();

        this.weights_ih = new Matrix(this.n_h_nodes, this.n_i_nodes);
        this.weights_ho = new Matrix(this.n_o_nodes, this.n_h_nodes);

        this.weights_ih.randomize();
        this.weights_ho.randomize();
    }

    //algoritmo de processamento de entradas
    feedforward(input) {
        /* Input - Hidden */ 

        //converte o input em matrix
        input = Matrix.arrayToMatrix(input);
        
        //multiplica pelos pesos
        let hidden = Matrix.multiply(this.weights_ih, input);

        //adiciona o bias
        hidden = Matrix.add(hidden, this.bias_i_h);

        //mapeamento para aprendizado com função de ativação não
        //linear
        hidden.map(sigmoid);

        /* Hidden - output */

        //multiplica pelos pesos
        let output = Matrix.multiply(this.weights_ho, hidden);

        //adiciona o bias
        output = Matrix.add(output, this.bias_h_o);

        //mapeamento para aprendizado com função de ativação não
        //linear
        output.map(sigmoid);

        //retorna o output
        return output;
    }
}