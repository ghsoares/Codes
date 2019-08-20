def find(array, val):
    idx = -1
    for i in range(len(array)):
        if array[i] == val:
            idx = i
            break
    return idx


N, M = list(map(int, input().split()))

GX = 0
GY = 0

mat = []
for i in range(N):
    Str = input()
    arr = []
    idx = 0
    for i in Str:
        arr.append(i)
        if i == 'o':
            GX = idx
        idx += 1
    mat.append(arr)

def fall(x, y, maxSizeX, maxSizeY):
    #print(array[y][x])

    if y >= maxSizeY - 1:
        return


    print(x, maxSizeX)
    print(y, maxSizeY)

    if mat[y + 1][x] == '.' or mat[y + 1][x] == 'o':
        mat[y + 1][x] = 'o'
        fall(x, y +1, maxSizeX, maxSizeY)
        
    elif mat[y + 1][x] == '#':
        if x + 1 > maxSizeX:
            return
        if mat[y][x + 1] == '.' or mat[y][x + 1] == 'o':
            mat[y][x + 1] = 'o'
            fall(x + 1, y, maxSizeX, maxSizeY)
            
        if x - 1 < 0:
            return
        if mat[y][x - 1] == '.' or mat[y][x - 1] == 'o':
            mat[y][x - 1] = 'o'
            fall(x - 1, y, maxSizeX, maxSizeY)
            
fall(GX, GY, M, N)
for i in range(len(mat)):
    Str = ''
    for b in range(len(mat[i])):
        Str += mat[i][b]
    print(Str)
        




    


    