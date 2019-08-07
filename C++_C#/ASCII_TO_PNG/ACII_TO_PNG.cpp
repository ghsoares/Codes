#include <SFML/Graphics.hpp>
#include <iostream>
#include <fstream>
#include <string>
#include <cstring>

using namespace std;
using namespace sf;

//escala de cinza
const string GREY_SCALE = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^'. ";

//escala
struct scl {
    int linhas;
    int colunas;
};

//pega o n�mero de linhas e colunas de um texto
scl lines_and_columns(vector<string> text) {
    scl result;
    result.linhas = text.size();
    result.colunas = text[0].length() + 1;
    return result;
}

//fun��o principal
int main() {
    //imagem gerado
    Image generated_image;

    //arquivo de input
    fstream text_file;
    while (true) {
        //caminho de entrada
        string in_path;
        cout << "Insira o caminho de entrada: ";
        cin >> in_path;
        char char_in_path[in_path.length() + 1];
        strcpy(char_in_path, in_path.c_str());

        //checa se o arquivo existe
        text_file.open(char_in_path);
        if (text_file.fail()) {
            cout << "Nao foi possivel abrir o arquivo " << char_in_path << endl;
        } else {
            break;
        }
    }

    //caminho de sa�da
    string output_path;
    cout << endl << "Insira o caminho de saida: ";
    cin >> output_path;

    //come�a a gerar
    cout << endl << "gerando... " << endl;

    //texto de input
    vector<string> image_text;

    //escreve
    while (!text_file.eof()) {
        string line;
        getline(text_file, line);
        image_text.push_back(line);
    }

    //linhas e colunas do texto
    scl l_c = lines_and_columns(image_text);

    //cria a imaagem
    generated_image.create(l_c.colunas, l_c.linhas);

    //passa por cada linha e coluna
    for (int y = 0; y < l_c.linhas; y++) {
        for (int x = 0; x < l_c.colunas; x++) {
            //pega o caracter
            char this_char = image_text[y][x];

            //pega o index
            int idx = GREY_SCALE.find(this_char);

            //caracter inv�lido
            if (idx == -1) {
                continue;
            }

            //escala de cinza
            float g_scl = idx / 66.0f;

            //coloca o pixel
            generated_image.setPixel(x, y, Color(g_scl * 255, g_scl * 255, g_scl * 255));
        }
    }

    //gerou a imagem
    cout << "gerado! " << endl;

    //salva a imagem
    generated_image.saveToFile(output_path);

}
