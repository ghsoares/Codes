#include <iostream>
#include <SFML/Graphics.hpp>
#include <string>
#include <fstream>

using namespace std;
using namespace sf;

//escala de cinza
const string GREY_SCALE = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^'. ";

//função principal
int main() {
    //texto gerado
    string generated_text = "";

    //caminho da imagem
    string path;
    cout << "Insira o caminho da imagem: ";
    cin >> path;

    //output
    string output_path;
    cout << endl << "Insira o caminho de saida: ";
    cin >> output_path;

    cout << endl << "Gerando...";

    //abre a imagem
    Image image;
    image.loadFromFile(path);

    //passa por cada pixel
    for (int y = 0; y < image.getSize().y; y++) {
        for (int x = 0; x < image.getSize().x; x++) {
            Color pixel_color = image.getPixel(x, y);
            float grey_scale = (unsigned(pixel_color.r) / 255.0f + unsigned(pixel_color.g) / 255.0f + unsigned(pixel_color.b) / 255.0f) / 3.0f;
            int igrey_scale = grey_scale * 66;
            //cout << igrey_scale << endl;
            generated_text += GREY_SCALE[igrey_scale];
        }
        generated_text += "\n";
    }

    cout << "Gerado com sucesso!!" << endl;

    //abre o arquivo de texto
    ofstream text_file;
    text_file.open(output_path);
    text_file << generated_text;
    text_file.close();

    return 0;
}
