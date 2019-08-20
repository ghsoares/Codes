#include <iostream>

using namespace std;

//função principal
int main() {
    //sequência
    int seq[4];

    //insere a sequência
    cin >> seq[0] >> seq[1] >> seq[2] >> seq[3];

    //pega o primeiro e último index e compara os dois. Caso forem iguais, a sequência repete
    if (seq[0] == seq[3]) {
        cout << "F";
    } else cout << "V";

    return 0;
}
