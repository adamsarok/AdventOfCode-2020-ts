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
  while (iterations <= 1) {
    const r = iterate(seats);
    console.log(`iter:${iterations} ->`);
    for (const row of seats) {
      console.log(row);
    }
    iterations++;
    if (arraysEqual(lastState, r)) {
      return iterations;
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
  const result: string[][] = [];
  const occupiedIndices: number[] = [];
  let index = 0;
  for (let x = 0; x < width; x++) {
    const row: string[] = [];
    for (let y = 0; y < height; y++) {
      switch (seats[y][x]) {
        case '.':
          row.push('.');
          break;
        case 'L':
          if (getNeighbourOccupiedCnt(x, y) === 0) {
            row.push('#');
            occupiedIndices.push(index);
          } else {
            row.push('L');
          }
          break;
        case '#':
          if (getNeighbourOccupiedCnt(x, y) >= 4) {
            row.push('L');
          } else {
            row.push('#');
            occupiedIndices.push(index);
          }
          break;
      }
      index++;
    }
    result.push(row);
  }
  // console.log(result);
  seats = result;
  return occupiedIndices;
}

const neighbors = getNeighbourVecs();

function getNeighbourOccupiedCnt(x: number, y: number) {
  let occupied = 0;
  for (const n of neighbors) {
    const xx = x + n.x;
    const yy = y + n.y;
    if (
      xx >= 0 &&
      xx < width &&
      yy >= 0 &&
      yy < height &&
      seats[y][x] === '#'
    ) {
      if (x === 5 && y === 0) {
        console.log(`${xx}:${yy}`);
      }
      occupied++;
    }
  }
  return occupied;
}
