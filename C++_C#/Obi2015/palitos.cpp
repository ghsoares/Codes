#include <iostream>

using namespace std;

//função principal
int main() {
    //número de palitos
    int palitos;
    cin >> palitos;

    //número máximo de palitos entre cada um
    int max_palitos;
    cin >> max_palitos;

    //caso max_palitos * 3 é menor que o número de palitos, então tem 0 maneiras
    //de se dividir
    if (max_palitos * 3 < palitos) {
        cout << 0;
        return 0;
    //vai ser distribuído igualmente
    } else if (max_palitos * 3 == palitos) {
        cout << 1;
        return 0;
    }

    //número de casos
    int ways = 0;

    //while loop
    while (true) {
        //vezes nesta tentativa
    }


}
