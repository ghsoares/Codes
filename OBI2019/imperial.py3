N = int(input())
V = []
for i in range(N):
    V.append(int(input()))

n = 0

for i in range(len(V)):
    This = 0
    for x in range(i, len(V)):
        if i == x:
            continue

        if V[i] == V[x] + 1 or V[i] == V[x] - 1:
            This = 0
            break
        
        This = 1
    
    n += This
    

print(n)
    

    