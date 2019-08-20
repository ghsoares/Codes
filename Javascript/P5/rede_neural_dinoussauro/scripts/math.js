/*
    Funções e classes matemáticas úteis
*/

//matrix
class Matrix {
    //construtor
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        //cria a data
        for (let i = 0; i < rows; i++) {
            let arr = [];
            for (let j = 0; j < cols; j++) {
                arr.push(0);
            }
            this.data.push(arr);
        }
    }

    //retorna uma cópia desta matrix
    copy() {
        //nova matrix
        let nm = new Matrix(this.data.length, this.data[0].length);

        //data desta matrix
        let nData = [...this.data];

        //passa por cada array
        nData.map((elm, i) => {
            return elm.slice();
        })

        //insere esta nova data no novo matrix
        nm.data = nData;

        //retorna esta nova rede neural
        return nm;
    }

    //converte um array em matrix
    static arrayToMatrix(arr) {
        let new_matrix = new Matrix(arr.length, 1);
        new_matrix.map((elm, i, j) => {
            return arr[i];
        })
        return new_matrix;
    }

    //aleatoriza a matrix
    randomize() {
        this.map((elm, i, j) => {
            return Math.random()*2 - 1;
        })
    }

    //mapeamento da matrix (aplica uma função para cada elemento
    //da matrix) estática
    static map(A, B, func) {
        let new_matrix = new Matrix(A.rows, B.rows);

        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            })
        })

        return this;
    }

    //mapeamento da matrix (aplica uma função para cada elemento
    //da matrix)
    map(func) {
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            })
        })

        return this;
    }

    //adiciona uma matrix por outra
    static add(A, B) {
        let new_matrix = new Matrix(A.rows, A.cols);
        new_matrix.map((elm, i, j) => {
            return A.data[i][j] + B.data[i][j];
        })
        return new_matrix;
    }

    //multiplica uma matrix por outra
    static multiply(A, B) {
        let new_matrix = new Matrix(A.rows, B.cols);
        new_matrix.map((elm, i, j) => {
            let sum = 0;
            for (let k = 0; k < A.cols; k++) {
                let elm1 = A.data[i][k];
                let elm2 = B.data[k][j];

                sum += elm1 * elm2;
            }

            return sum;
        })

        return new_matrix;
    }

    //mostra a matrix no console
    print() {
        console.table(this.data);
    }
}

//retângulo
class Rectangle {
    //construtor
    constructor(position_x, position_y, size_x, size_y) {
        this.position = createVector(position_x, position_y);
        this.size = createVector(size_x, size_y);
    }

    //detecta se dois retângulos intersectam
    static intersect(A, B) {
        if (A.position.x > B.position.x + B.size.x || A.position.x + A.size.x < B.position.x) {
            return false;
        }
        if (A.position.y > B.position.y + B.size.y || A.position.y + A.size.y < B.position.y) {
            return false;
        }
        return true;
    }
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

/**
 * @description Interpolação linear entre dois números
 * @param {number} x Número inicial
 * @param {number} y Número final
 * @param {number} amnt Quantidade de interpolação
 */
function _lerp(x, y, amnt) {
    return (1 - amnt) * x + amnt * y;
}

/**
 * @description Essa função limita um número n entre x e y
 * @param {number} n Número para limitar
 * @param {number} x Número mínimo
 * @param {number} y Número máximo
 */
function clamp(n, x, y) {
    if (n < x) {
        n = x
    }
    if (n > y) {
        n = y
    }
    return n
}