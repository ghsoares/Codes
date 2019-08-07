#include <SFML/Graphics.hpp>
#include <iostream>
#include <cstdlib>
#include <ctime>
#include <vector>
#include <cmath>

using namespace sf;
using namespace std;

//função de mapeamento
float fmap(float n, float x1, float y1, float x2, float y2) {
    return (n - x1) * (y2 - x2) / (y1 - x1) + x2;
}

//interpolação linear
float lerp(float from, float to, float amnt) {
    return from + amnt * (to - from);
}

//interpolação de cores
Color color_interpolation(Color from, Color to, float amnt) {
    //r
    int r = lerp(unsigned(from.r), unsigned(to.r), amnt);

    //g
    int g = lerp(unsigned(from.g), unsigned(to.g), amnt);

    //b
    int b = lerp(unsigned(from.b), unsigned(to.b), amnt);

    //a
    int a = lerp(unsigned(from.a), unsigned(to.a), amnt);

    //retorna essa cor
    return Color(r, g, b, a);
}

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

//gradient
class gradient {
public:
    vector<Color> colors;
    vector<float> offsets;

    //construtor com argumentos
    gradient(vector<Color> _colors, vector<float> _offsets) {
        colors = _colors;
        offsets = _offsets;
    }

    //construtor padrão
    gradient() {}

    //adiciona uma cor
    void add_color(Color color, float offset) {
        colors.push_back(color);
        offsets.push_back(offset);
    }

    //interpolação
    Color interpolate(float offset) {
        //cor de
        Color c_from;

        //cor para
        Color c_to;

        //offset de
        float off_from;

        //offset para
        float off_to;

        //passa por cada index
        for (int i = 0; i < offsets.size(); i++) {
            //caso o offset é maior que este offset, muda o offset de
            //0.0 - 0.5
            //0.25
            if (offset >= offsets[i]) {
                c_from = colors[i];
                off_from = offsets[i];
            }

            //index invertido
            int inv_i = (offsets.size() - 1) - i;

            //caso o offset é menor que este offset, muda o offset para
            if (offset <= offsets[inv_i]) {
                c_to = colors[inv_i];
                off_to = offsets[inv_i];
            }
        }

        //quantidade de interpolação
        float int_amnt = fmap(offset, off_from, off_to, 0, 1);

        //cout << c_from.r << ", " << c_from.g << ", " << c_from.b << ", " << c_to.a << endl;
        //cout << c_to.r << ", " << c_to.g << ", " << c_to.b << ", " << c_to.a << endl;

        //retorna interpolação
        return color_interpolation(c_from, c_to, int_amnt);
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

//gradiente
gradient snake_gradient;

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

    //muda a cor
    head_shape.setFillColor(snake_gradient.interpolate(0.5));

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

        cout << fmap(sin(i * 0.01) * , -1, 1, 0, 1) << endl;

        //cor
        Color body_color = snake_gradient.interpolate(fmap(sin(i * 0.01), -1, 1, 0, 1));

        //muda a cor do corpo
        body_shape.setFillColor(body_color);

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
    snake_gradient.add_color(Color(255, 0, 0), 0.0);
    snake_gradient.add_color(Color(0, 255, 0), 0.5);
    snake_gradient.add_color(Color(0, 0, 255), 0.1);

    //cout << snake_gradient.interpolate(0.3).r << ", " << snake_gradient.interpolate(0.3).g << ", " << snake_gradient.interpolate(0.3).b;

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
