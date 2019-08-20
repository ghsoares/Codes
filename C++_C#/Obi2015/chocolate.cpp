#include <iostream>

using namespace std;

//ponto numa matrix
class point {
public:
    int x;
    int y;
    point() {
        x = 0;
        y = 0;
    }

    point(int _x, int _y) {
        x = _x;
        y = _y;
    }
};

//função principal
int main() {
    //dimensão
    int dim;
    cin >> dim;

    //posições das figurinhas
    point figura_1;
    point figura_2;
    cin >> figura_1.x >> figura_1.y;
    cin >> figura_2.x >> figura_2.y;

    //pode verticalmente
    bool v = false;

    //pode horizontalmente
    bool h = false;

    //quadrante da primeira figura
    int fig_1_quad = 0;
    if (figura_1.x <= dim / 2) {
        if (figura_1.y <= dim / 2) {
            fig_1_quad = 0;
        } else fig_1_quad = 3;

    } else {
        if (figura_1.y <= dim / 2) {
            fig_1_quad = 1;
        } else fig_1_quad = 2;
    }

    //quadrante da segunda figura
    int fig_2_quad = 0;
    if (figura_2.x <= dim / 2) {
        if (figura_2.y <= dim / 2) {
            fig_2_quad = 0;
        } else {
            fig_2_quad = 3;
        }
    } else {
        if (figura_2.y <= dim / 2) {
            fig_2_quad = 1;
        } else {
            fig_2_quad = 2;
        }
    }

    //os dois estão no mesmo quadrante
    if (fig_1_quad == fig_2_quad) {
        cout << "N";
    } else cout << "S";
}
