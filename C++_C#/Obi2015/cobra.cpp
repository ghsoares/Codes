#include <iostream>

using namespace std;

//fun��o principal
int main() {
    //sequ�ncia
    int seq[4];

    //insere a sequ�ncia
    cin >> seq[0] >> seq[1] >> seq[2] >> seq[3];

    //pega o primeiro e �ltimo index e compara os dois. Caso forem iguais, a sequ�ncia repete
    if (seq[0] == seq[3]) {
        cout << "F";
    } else cout << "V";

    return 0;
}
