#include <iostream>

using namespace std;

//fun��o principal
int main() {
    //n�mero de palitos
    int palitos;
    cin >> palitos;

    //n�mero m�ximo de palitos entre cada um
    int max_palitos;
    cin >> max_palitos;

    //caso max_palitos * 3 � menor que o n�mero de palitos, ent�o tem 0 maneiras
    //de se dividir
    if (max_palitos * 3 < palitos) {
        cout << 0;
        return 0;
    //vai ser distribu�do igualmente
    } else if (max_palitos * 3 == palitos) {
        cout << 1;
        return 0;
    }

    //n�mero de casos
    int ways = 0;

    //while loop
    while (true) {
        //vezes nesta tentativa
    }


}
