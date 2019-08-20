import CRYPTO_API as crypto
import time

#mensagem teste
test = input("\nInsira um texto: ")

#tamanho da keylist
keysize = int(input("\nInsira o tamanho de cada key gerada: "))

#tempo de início para medir o tempo de execução do código
start_time = time.time()

print("\n")

#mesagem encryptada
test = crypto.encrypt(test, keysize)
print(f"tamanho do texto criptografado: {len(test.word)}")

print("\n")

#characteres perdidos
print(f"caracteres perdidos: {test.lost_chars}")

print("\n")

#tempo final
end_time = time.time()

#delta
delta = end_time - start_time
print(f"tempo total de encriptação: {delta} segundos")

print("\n")

#tempo para cada key
print(f"tempo gasto para cada key: {delta / keysize} segundos")

print("\n")

#tempo inicial
start_time = time.time()

#mensagem decryptografada
dtest = crypto.decrypt(test)
print(f"texto decriptografado: {dtest}")

print("\n")

#tempo final
end_time = time.time()

#delta
delta = end_time - start_time

#tempo gasto
print(f"tempo total de decriptogração: {delta} segundos")

print("\n")
