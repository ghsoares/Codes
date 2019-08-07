#include <iostream>
#include <SFML/Graphics.hpp>
#include <cstdlib>
#define GRAD_SIZE 64

using namespace std;
using namespace sf;

//tamanho do fogo em pixels
const int FIRE_SIZE_X = 64;
const int FIRE_SIZE_Y = 64;

//tempo se passado até então
float time_ellapsed = 0;

//gradiente do fogo
const int GRADIENT[GRAD_SIZE][4] = {
        {0,0,0,255}, {9,0,0,255}, {18,0,0,255}, {28,0,0,255},{37,0,0,255}, {47,0,0,255}, {56,0,0,255},
        {65,0,0,255}, {75,0,0,255}, {84,0,0,255}, {94,0,0,255}, {103,0,0,255}, {112,0,0,255}, {122,0,0,255},
        {131,0,0,255}, {141,0,0,255}, {150,0,0,255}, {160,0,0,255}, {169,0,0,255}, {178,0,0,255},
        {188,0,0,255}, {197,0,0,255}, {207,0,0,255}, {216,0,0,255}, {225,0,0,255}, {235,0,0,255},
        {244,0,0,255}, {254,0,0,255}, {255,8,0,255}, {255,17,0,255}, {255,25,0,255}, {255,34,0,255},
        {255,43,0,255}, {255,51,0,255}, {255,60,0,255}, {255,68,0,255}, {255,77,0,255}, {255,86,0,255},
        {255,94,0,255}, {255,103,0,255}, {255,111,0,255}, {255,120,0,255}, {255,129,0,255}, {255,137,0,255},
        {255,146,0,255}, {255,154,0,255}, {255,163,0,255}, {255,171,0,255}, {255,180,0,255}, {255,189,0,255},
        {255,197,0,255}, {255,206,0,255}, {255,214,0,255}, {255,223,0,255}, {255,232,0,255}, {255,239,5,255},
        {255,241,37,255}, {255,243,68,255}, {255,245,99,255}, {255,247,130,255}, {255,249,161,255},
        {255,251,192,255}, {255,253,223,255}, {255,255,255,255}
};

//tamanho do pixel
const int PIXEL_SIZE = 4;

//array do fogo
float fire_array[FIRE_SIZE_X * FIRE_SIZE_Y];

//cria a estrutura de dados do fogo
void create_fire_structure() {
    for (int i = 0; i < FIRE_SIZE_X * FIRE_SIZE_Y; i++) {
        fire_array[i] = 0;
    }
}

//cria a base do fogo
void create_fire_base(int intensity) {
    for (int i = 0; i < FIRE_SIZE_X; i++) {
        //index da base
        int idx = i + ((FIRE_SIZE_Y - 1) * FIRE_SIZE_X);

        //muda a intensidade da base para essa intensidade
        fire_array[idx] = intensity - 1;
    }
}

//calcula propagação
void propagation(int idx) {
    //pega o index debaixo
    int bellow_idx = idx + FIRE_SIZE_X;

    //caso o index é maior ou igual que o fogo em sí
    if (bellow_idx >= FIRE_SIZE_X * FIRE_SIZE_Y) {
        return;
    }

    //decaimento
    int _decay = rand() % 3 + 1;

    //pega a intensidade debaixo
    int new_intensity = fire_array[bellow_idx] - _decay;

    //limita a intensidade
    if (new_intensity < 0) {
        new_intensity = 0;
    } else {
        if (new_intensity > GRAD_SIZE) {
            new_intensity = GRAD_SIZE;
        }
    }

    //muda a intensidade atual para a nova intensidade
    fire_array[idx] = new_intensity;
}

//renderiza o fogo
void _render(RenderWindow &window) {
    //posição
    int x = 0;
    int y = 0;

    /*passa por cada index (não está sendo usado dois loops "for" para
                            melhorar a performace)
    */
    for (int i = 0; i < FIRE_SIZE_X * FIRE_SIZE_Y; i++) {
        //calcula propagação
        propagation(i);

        //caso a intensidade é zero, vai para o próximo
        if (fire_array[i] != 0) {
            //shape de retângulo
            RectangleShape pixelRect(Vector2f(PIXEL_SIZE, PIXEL_SIZE));

            //posição do retângulo
            pixelRect.setPosition(Vector2f(x * PIXEL_SIZE, y * PIXEL_SIZE));

            //pega a intensidade
            int intensity = fire_array[i];

            //pega as cores
            Color pixelColor = Color(GRADIENT[intensity][0], GRADIENT[intensity][1], GRADIENT[intensity][2], GRADIENT[intensity][3]);

            //cor
            pixelRect.setFillColor(pixelColor);

            //desenha na tela o formato
            window.draw(pixelRect);
        }

        //adiciona um pelo x
        x++;

        //adiciona um pelo y
        if (x > FIRE_SIZE_X - 1) {
            x = 0;
            y++;
        }
    }
}

//chamado quando o programa inicia
void _ready(RenderWindow &window) {
    create_fire_structure();
    create_fire_base(GRAD_SIZE);
}

//atualiza o programa (recebe a janela do aplicativo e delta como argumentos)
void _process(RenderWindow &window, float delta) {
    _render(window);
    time_ellapsed += delta;
}

//função principal
int main()
{
    //timer
    float timer;

    //relógio
    Clock clock;

    //cria a janela
    RenderWindow window(VideoMode(FIRE_SIZE_X * PIXEL_SIZE, FIRE_SIZE_Y * PIXEL_SIZE), "Doom Fire");

    //chama a função ready
    _ready(window);

    //roda o programa enquanto que o programa está aberto
    while (window.isOpen()) {
        //delta (tempo passado entre o frame anterior e este frame
        float delta = clock.getElapsedTime().asSeconds();
        clock.restart();

        //input
        Event ev;

        //janela está recebendo input
        while (window.pollEvent(ev)) {
            if (ev.type == Event::Closed) {
                window.close();
            }
        }

        //limpa a janela do frame anterior
        window.clear(Color::Black);

        //atualiza
        _process(window, delta);

        //termina o frame e mostra na tela
        window.display();
    }

    return 0;
}

