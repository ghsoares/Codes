#include <iostream>
#include <SFML/Graphics.hpp>

//dimens�es da janela
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

//fun��o principal
int main() {
    //janela de renderiza��o
    RenderWindow window(VideoMode(GRID_WIDTH * PIXEL_SIZE, GRID_HEIGHT * PIXEL_SIZE), "Meu jogo!");

    //rel�gio
    Clock clock;

    //loop enquanto a janela estiver aberta
    while (window.isOpen()) {
        //delta
        float delta = clock.getElapsedTime().asSeconds();

        //reinicia o rel�gio
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
