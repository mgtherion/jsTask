var mainDigit = 1; // this will have ~50% of all digits generated
var xCoord = [1, 4]; // main task is to find all neighbors of this cell

// GENERATION PART
var arraySize = 7, data = [];

function getRangeInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < arraySize; i++) {
    data[i] = [];
    for (var j = 0; j < arraySize; j++) {
        if (Math.random() > 0.5) {
            data[i][j] = mainDigit;
        } else {
            data[i][j] = getRangeInt(0, 9);
        }
    }
}
data[xCoord[0]][xCoord[1]] = mainDigit;
console.log('data', data);

//test data from task
/*data = [
    [0, 1, 1, 2, 5, 9, 2],
    [4, 7, 1, 1, 1, 5, 8],
    [4, 9, 4, 6, 1, 1, 5],
    [0, 7, 8, 1, 1, 6, 1],
    [3, 8, 2, 1, 1, 6, 5],
    [2, 5, 2, 8, 8, 1, 3],
    [9, 4, 9, 0, 0, 3, 4]
];*/
// SOLUTION PART
var clonedData = JSON.parse(JSON.stringify(data)), resultCoords = [xCoord], newEquals;
clonedData[xCoord[0]][xCoord[1]] = 'checked';

function getNewNeighbors(x, y) {
    var result = [];
    if (x > 0 && clonedData[x-1][y] != 'checked' && clonedData[x-1][y] == mainDigit) {
        result.push([x - 1, y]);
        clonedData[x-1][y] = 'checked';
    }
    if (x < arraySize-1 && clonedData[x+1][y] != 'checked' && clonedData[x+1][y] == mainDigit) {
        result.push([x + 1, y]);
        clonedData[x+1][y] = 'checked';
    }
    if (y > 0 && clonedData[x][y-1] != 'checked' && clonedData[x][y-1] == mainDigit) {
        result.push([x, y - 1]);
        clonedData[x][y-1] = 'checked';
    }
    if (y < arraySize-1 && clonedData[x][y+1] != 'checked' && clonedData[x][y+1] == mainDigit) {
        result.push([x, y + 1]);
        clonedData[x][y+1] = 'checked';
    }
    return result;
}

newEquals = getNewNeighbors(xCoord[0], xCoord[1]);
while (newEquals.length) {
    var temp = [];
    for (var i = 0; i < newEquals.length; i++) {
        temp = temp.concat(getNewNeighbors(newEquals[i][0], newEquals[i][1]));
    }
    resultCoords = resultCoords.concat(newEquals);
    newEquals = temp;
}
console.log('result', resultCoords);

