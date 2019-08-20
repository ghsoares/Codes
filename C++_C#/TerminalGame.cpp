#include <iostream>
#include <SFML/Graphics.hpp>

//dimensões da janela
#define GRID_HEIGHT 32
#define GRID_WIDTH 32
#define PIXEL_SIZE 4

using namespace std;
using namespace sf;

//mapa
String *game_map = {
    "################################",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",
    "#..............................#",

};

//processo
void _process(RenderWindow& window, float delta) {
}

//função principal
int main() {
    //janela de renderização
    RenderWindow window(VideoMode(GRID_WIDTH * PIXEL_SIZE, GRID_HEIGHT * PIXEL_SIZE), "Meu jogo!");

    //relógio
    Clock clock;

    //loop enquanto a janela estiver aberta
    while (window.isOpen()) {
        //delta
        float delta = clock.getElapsedTime().asSeconds();

        //reinicia o relógio
        clock.restart();

        //recebe input
        Event ev;

        //janela recebe input
        while (window.pollEvent(ev)) {
            //fecha a janela
            if (ev.type == Event::Closed) {
                window.close();
            }
        }

        //limpa a tela
        window.clear(Color::Black);

        //processo do jogo
        _process(window, delta);
    }
}
