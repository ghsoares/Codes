import random

"""
    API para encriptação de mensagens básico, apenas para uso didático,
    já que não usa métodos eficientes de encriptação e armazenamento das mensagens.

    --como funciona:
        Quando é chamado a função "encrypt" dessa API, é feito o seguinte
        processo:
            -cria uma nova classe "Encrypted" para armazenar a mensagem criptografada
            e a "keylist" (uma lista com todos os caracteres ASCII e seus keys gerados
            aleatóriamente);

            -gera a keylist com o tamanho da key de cada caracter;

            -para cada letra da mensagem (incluindo espaço e caracteres especiais) é substituido
            por sua respectiva key na keylist (por exemplo, "A" pode virar "0dk^~kl3H a");

            -a nova classe "Encrypted" armazena a mensagem criptografada e a keylist gerada, e é
            retornada pela função
        
        A função "decrypted" é o inverso do "encrypt".
"""

#encrypted string class
class Encrypted:
    #word encrypted
    word: str = ""

    #keylist to encrypt
    keylist: dict = {}

    #lost keys
    lost_chars: list = []

#the possible keys
keys: list = [
    chr(i) for i in list(range(32, 127)) + list(range(128, 255))
]

#select a random variable from a list
def _randlist(l: list):
    #random id
    id = random.randint(0, len(keys) - 1)

    #return the item from the list with the id
    return l[id]

#generate a crypted keylist
def generate_keylist(key_size: int) -> dict:
    #generated keylist
    keylist: dict = {}

    #generate the keylist
    for key in keys:
        thiskey = "".join([
            _randlist(keys) for _ in range(key_size)
        ])
        keylist[key] = thiskey
    
    #return the generated keylist
    return keylist

#encrypt a string
def encrypt(string: str, key_size: int = 16) -> Encrypted:
    #encrypted string class
    encrypted_string_class = Encrypted()

    #create a new keylist
    new_keylist = generate_keylist(key_size)

    #the encrypted string
    encrypted_string = ""

    #encrypt
    for char in string:
        if not char in new_keylist.keys():
            encrypted_string_class.lost_chars.append(char)
            continue
        encrypted_string += new_keylist[char]

    #store the encrypted word and the keylist
    encrypted_string_class.word = encrypted_string
    encrypted_string_class.keylist = new_keylist

    #return the encrypted string class
    return encrypted_string_class

#decrypt a encrypted string
def decrypt(encrypted_string_class: Encrypted) -> str:
    #get the encrypted word
    string: str = encrypted_string_class.word

    #decrypt
    for thiskey in encrypted_string_class.keylist:
      string = string.replace(encrypted_string_class.keylist[thiskey], thiskey)

    del encrypted_string_class

    #return the decrypted string
    return string
