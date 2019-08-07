#include <iostream>

using namespace std;

//função principal
int main() {
	//variáveis iniciais
	//tamanho e soma total
	int tamanho, somaTotal;
	
	//quantas vezes fez a soma igual ao somaTotal
	int vezes = 0;
	
	cin >> tamanho >> somaTotal;
	
	//cria o array
	int sequencia[tamanho] = {};
	for (int i = 0; i < tamanho; i++) {
		int number;
		cin >> number;
		
		sequencia[i] = number;
	}
	
	//passa por cada index
	for (int a = 0; a < tamanho; a++) {
		int soma = sequencia[a];
		if (soma == somaTotal) {
			vezes ++;
		}
		for (int b = a + 1; b < tamanho; b++) {
			soma += sequencia[b];
			if (soma > somaTotal) {
				break;
			}
			if (soma == somaTotal) {
				vezes++;
			}
		}
	}
	
	cout << vezes;
	
	return 0;
}
