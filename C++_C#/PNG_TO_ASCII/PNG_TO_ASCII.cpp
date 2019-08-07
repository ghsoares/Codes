#include <iostream>
#include <SFML/Graphics.hpp>
#include <string>
#include <cstring>
#include <fstream>

using namespace std;
using namespace sf;

//escala de cinza
const string GREY_SCALE = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^'. ";

//função principal
int main() {
    //texto gerado
    string generated_text = "";

    //abre a imagem
    Image image;
    while (true) {
        //caminho da imagem
        string path;
        cout << "Insira o caminho da imagem: ";
        cin >> path;

        //carregado com sucesso
        if(image.loadFromFile(path)) {
            break;
        }
    }

    //output
    string outpath;
    cout << endl << "Insira o caminho de saida: ";
    cin >> outpath;

    //converte o caminho de saída inserido (string) em caminho de saída (char)
    char output_path[outpath.length() + 1];
    strcpy(output_path, outpath.c_str());

    //começa a gerar o texto
    cout << endl << "Gerando..." << endl;

    //passa por cada pixel
    for (int y = 0; y < image.getSize().y; y++) {
        for (int x = 0; x < image.getSize().x; x++) {
            //pega a cor do pixel (uint8 r, uint8 g, uint8 b, uint8 a. Sendo que a é omitido)
            Color pixel_color = image.getPixel(x, y);

            //escala de cinza
            float grey_scale = (unsigned(pixel_color.r) / 255.0f + unsigned(pixel_color.g) / 255.0f + unsigned(pixel_color.b) / 255.0f) / 3.0f;
            int igrey_scale = grey_scale * 66;

            //adiciona ao texto, o caracter com a escala de cor equivalente
            generated_text += GREY_SCALE[igrey_scale];
        }
        //quebra de linha para a próxima linha da imagem
        generated_text += "\n";
    }

    cout << "Gerado com sucesso!!" << endl;

    //abre o arquivo de texto
    ofstream text_file;

    //abre o arquivo de saída
    text_file.open(output_path);

    //escreve o arquivo com o texto gerado
    text_file << generated_text;

    //fecha o arquivo
    text_file.close();

    return 0;
}
