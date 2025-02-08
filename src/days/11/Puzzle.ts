import { type Vec, getNeighbourVecs } from '../../types/Vec';
let width = 0,
  height = 0;

let seats: string[][] = [];

const first = (input: string) => {
  seats = input.split('\n').map((x) => x.trim().split(''));
  height = seats.length;
  width = seats[0].length;
  let iterations = 0;
  let lastState: number[] = [];
  while (iterations <= 10000) {
    const r = iterate();
    iterations++;
    console.log(`iter:${iterations}:${r.length}`);
    if (arraysEqual(lastState, r)) {
      return r.length;
    }
    lastState = r;
  }
  // I dont think its enough to count occupied seat cnt
  return -1;
};

const expectedFirstSolution = 37;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };

function arraysEqual(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function iterate() {
  const occupiedIndices: number[] = [];
  let index = 0;
  const previousSeats = seats.map((row) => [...row]);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      switch (previousSeats[x][y]) {
        case 'L':
          if (getNeighbourOccupiedCnt(previousSeats, x, y) === 0) {
            seats[x][y] = '#';
            occupiedIndices.push(index);
          } else {
            seats[x][y] = 'L';
          }
          break;
        case '#':
          if (getNeighbourOccupiedCnt(previousSeats, x, y) >= 4) {
            seats[x][y] = 'L';
          } else {
            seats[x][y] = '#';
            occupiedIndices.push(index);
          }
          break;
      }
      index++;
    }
  }
  return occupiedIndices;
}

const neighbors = getNeighbourVecs();

function getNeighbourOccupiedCnt(
  previousSeats: string[][],
  x: number,
  y: number
) {
  let occupied = 0;
  for (const n of neighbors) {
    const xx = x + n.x;
    const yy = y + n.y;
    if (
      xx >= 0 &&
      xx < width &&
      yy >= 0 &&
      yy < height &&
      previousSeats[xx][yy] === '#'
    ) {
      occupied++;
    }
  }
  return occupied;
}
