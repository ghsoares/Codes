/*
    Funções matemáticas úteis
*/

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