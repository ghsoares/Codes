#importa as bibliotecas iniciais
from PIL import Image
import sys, os

#localização dos arquivos pngs
input_files = input("Insira a localização dos arquivos de entrada: ")

#caminho real
real_path = os.path.dirname(sys.argv[0]) + "\\" + input_files

#imagens na pasta
imgs = os.listdir(real_path)

#frames do GIF
#compreensão de listas
frames = [
    Image.open(real_path + "\\" + i) for i in imgs if (real_path + "\\" + i).endswith('.png')  
]

#arquivo de saída
output_file = input("Insira o nome de saída do arquivo (sem .gif): ")

#salva os frames num arquivo de saída
frames[0].save(
    output_file + ".gif", format='GIF',
    append_images=frames[1:],
    save_all=True, duration=300,
    loop=0
)