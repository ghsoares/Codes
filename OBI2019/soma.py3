N, K = list(map(int, input().split()))
X = list(map(int, input().split()))

n = 0

for i in range(len(X)):
    add = 0
    num = 0
    while True:

        if i + add > len(X) - 1:
            break

        num += X[i + add]
        if num > K:
            break
        elif num == K:
            n += 1
        add += 1

print(n)
