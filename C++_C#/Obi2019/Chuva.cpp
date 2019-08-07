#include <iostream>
#include <string>

using namespace std;

//estrutura de um vetor de 2 dimens�es de n�meros inteiros
struct Vector2 {
	int x;
	int y;
};

//calcula dispers�o
void dispersion(int sizeX, int sizeY, int posX, int posY, string *grid) {
	
	//caso a posi��o y � igual ao tamanho vertical do grid
	if (posY == sizeY - 1) {
		return;
	}
	
	//verifica se o pixel debaixo � '.' ou '#'
	if (grid[posY+1][posX] == '.') {
		grid[posY+1][posX] = 'o';
		dispersion(sizeX, sizeY, posX, posY + 1, grid);
	}
	else {
		//verifica se pode se mover para os lados
		if (posX > 0) {
			if (grid[posY][posX - 1] == '.') {
				grid[posY][posX - 1] = 'o';
				dispersion(sizeX, sizeY, posX - 1, posY, grid);
			}
		}
		if (posX < sizeX - 1) {
			if (grid[posY][posX + 1] == '.') {
				grid[posY][posX + 1] = 'o';
				dispersion(sizeX, sizeY, posX + 1, posY, grid);
			}
		}
	} 
	return;
}

//fun��o pricipal
int main() {
	//linhas e colunas
	int linhas, colunas;
	
	//localiza��o do ponto inicial
	Vector2 startPos;
	startPos.x = -1;
	startPos.y = -1;
	
	//entrada das linhas e colunas
	cin >> linhas >> colunas;
	
	//grid
	string grid[linhas] = {};
	
	//cria o grid
	for (int i = 0; i < linhas; i++) {
		//linha
		string line;
		
		//pega a linha
		cin >> line;
		
		//insere no grid
		grid[i] = line;
		
		//passa por cada caracter para verificar se � um ponto inicial
		for (int c = 0; c < colunas; c++) {
			if (line[c] == 'o') {
				startPos.x = c;
				startPos.y = i;
			}
		}
	}
	
	//caso n�o foi inserido o ponto inicial, retorna
	if (startPos.x == -1 || startPos.y == -1) {
		return 0;
	}
	
	//come�a dispers�o
	dispersion(colunas, linhas, startPos.x, startPos.y, grid);
	
	//passa por cada index do grid
	for (int i = 0; i < linhas; i++) {
		cout << grid[i] << endl;
	}
	
	return 0;
}
