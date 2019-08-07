#include <SFML/Graphics.hpp>
#include <iostream>
#include <cstdlib>
#include <ctime>
#include <vector>

using namespace sf;
using namespace std;

//ponto no plano cartesiano
class point {
    public:
        int x;
        int y;

        //construtor padrão, usado em arrays
        point(){
            x = 0;
            y = 0;
        }

        //construtor de inicialização
        point(int _x, int _y) {
            x = _x;
            y = _y;
        }

        //verifica se este ponto está na mesma localização
        //que outro vetor
        is_overriding(point point2) {
            if (x == point2.x && y == point2.y) {
                return true;
            } else {
                return false;
            }
        }

        //retorna este vetor duplicado
        point duplicate_point() {
            return point(x, y);
        }
};

//tamanho do pixel
const int PIXEL_SIZE = 4;

//grid
const int GRID_SIZE_X = 128;
const int GRID_SIZE_Y = 128;

//cabeça da cobra
point head = point(1, 0);

//tamanho inicial do corpo da cobra
int body_size = 1;

//corpo da cobra
vector<point> body(1);

//quantidade de maçãs
const int APPLE_QTD = 5;

//maçãs
point apples[APPLE_QTD];

//direção da cobra
point dir = point(1, 0);

//delay para cada frame
float delay = 0.1f;

//retorna uma localização aleatória no grid
point rand_location(int seed = -1) {
    if (seed >= 0) {
        srand(seed * time(NULL));
    } else {
        srand(time(NULL));
    }

    int x = rand() % GRID_SIZE_X;
    int y = rand() % GRID_SIZE_Y;
    point location(x, y);
    return location;
}

//inicia a fase
void _ready(RenderWindow& window) {
    //cria o array das maçãs
    for (int i = 0; i < APPLE_QTD; i++) {
        //pega uma localização aleatória
        point location = rand_location(i * 1000);

        //insere no array
        apples[i] = location;
    }
}

//renderiza
void _render(RenderWindow& window) {
    //retângulo
    RectangleShape head_shape = RectangleShape(Vector2f(PIXEL_SIZE, PIXEL_SIZE));

    //posição do retângulo
    head_shape.setPosition(Vector2f(head.x * PIXEL_SIZE, head.y * PIXEL_SIZE));

    //desenha o retângulo na tela
    window.draw(head_shape);

    //passa por cada index do corpo
    for (int i = 0; i < body_size; i++) {
        //retângulo
        RectangleShape body_shape = RectangleShape(Vector2f(PIXEL_SIZE, PIXEL_SIZE));

        //posição do retângulo
        body_shape.setPosition(Vector2f(body[i].x * PIXEL_SIZE, body[i].y * PIXEL_SIZE));

        //desenha o retângulo
        window.draw(body_shape);
    }

    //passa por cada maçã
    for (int i = 0; i < APPLE_QTD; i++) {
        //retângulo
        RectangleShape apple_shape = RectangleShape(Vector2f(PIXEL_SIZE, PIXEL_SIZE));

        //posição do retângulo
        apple_shape.setPosition(Vector2f(apples[i].x * PIXEL_SIZE, apples[i].y * PIXEL_SIZE));

        //cor
        apple_shape.setFillColor(Color(255, 0, 0));

        //desenha o retângulo
        window.draw(apple_shape);
    }
}

//processamento do frame
void _process(RenderWindow& window) {
    //posição anterior da cabeça
    point p_pos = head.duplicate_point();

    //move a cabeça
    head.x += dir.x;
    head.y += dir.y;

    //caso a cabeça passa do limite, da um loop
    if (head.x < 0) {
        head.x = GRID_SIZE_X - 1;
    } else if (head.x > GRID_SIZE_X - 1) {
        head.x = 0;
    } else if (head.y < 0) {
        head.y = GRID_SIZE_Y - 1;
    } else if (head.y > GRID_SIZE_Y - 1) {
        head.y = 0;
    }

    //caso a cabeça toque numa maçã
    for (int i = 0; i < APPLE_QTD; i++) {
        if (head.is_overriding(apples[i])) {
            apples[i] = rand_location();
            body.push_back(body[0].duplicate_point());
            body_size++;
        }
    }

    //passa por cada index do corpo
    for (int i = 0; i < body_size; i++) {
        //um pedaço antes da cabeça
        if (i == body_size - 1) {
            body[i] = p_pos;
        } else {
            //move esta parte para a próxima parte
            body[i] = body[i + 1];
        }
    }
}

//função principal
int main() {
    //janela
    RenderWindow window(VideoMode(GRID_SIZE_X * PIXEL_SIZE, GRID_SIZE_Y * PIXEL_SIZE), "Snake game");

    //chamado quando iniciado
    _ready(window);

    //relógio
    Clock clock;

    //tempo atual
    float time = 0.0f;

    //loop do aplicativo
    while (window.isOpen()) {
        //evento
        Event ev;

        //recebe input
        while (window.pollEvent(ev)) {
            //fecha a janela
            if (ev.type == Event::Closed) {
                window.close();
            }

            //input de tecla
            if (ev.type == Event::KeyPressed) {
                switch (ev.key.code) {
                    case Keyboard::Up:
                        if (dir.y != 1) {
                            dir.y = -1;
                            dir.x = 0;
                        }
                        break;
                    case Keyboard::Down:
                        if (dir.y != -1) {
                            dir.y = 1;
                            dir.x = 0;
                        }
                        break;
                    case Keyboard::Left:
                        if (dir.x != 1) {
                            dir.x = -1;
                            dir.y = 0;
                        }
                        break;
                    case Keyboard::Right:
                        if (dir.x != -1) {
                            dir.x = 1;
                            dir.y = 0;
                        }
                        break;
                }
            }
        }

        //limpa o display
        window.clear(Color::Black);

        //tempo que se passou
        float delta = clock.getElapsedTime().asSeconds();
        clock.restart();
        time += delta;
        if (time >= delay) {
            time = 0.0f;
            _process(window);
        }

        //renderiza
        _render(window);
        window.display();
    }

    return 0;
}
