import type Part from '../../types/Part';
import { type Vec, getNeighbourVecs } from '../../types/Vec';
let width = 0,
  height = 0;

let seats: string[][] = [];

const first = (input: string) => {
  return solve(1, input);
};

const expectedFirstSolution = 37;

const second = (input: string) => {
  return solve(2, input);
};

const expectedSecondSolution = 26;

export { first, expectedFirstSolution, second, expectedSecondSolution };

function solve(part: Part, input: string) {
  seats = input.split('\n').map((x) => x.trim().split(''));
  height = seats[0].length;
  width = seats.length;
  let iterations = 0;
  let lastState: number[] = [];
  while (iterations <= 10000) {
    const r = iterate(part);
    iterations++;
    console.log(`iter:${iterations}:${r.length}`);
    if (arraysEqual(lastState, r)) {
      return r.length;
    }
    lastState = r;
  }
  return -1;
}

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

function iterate(part: Part) {
  const occupiedIndices: number[] = [];
  let index = 0;
  const previousSeats = seats.map((row) => [...row]);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const neighbors = getNeighbourOccupiedCnt(previousSeats, x, y, part);
      switch (previousSeats[x][y]) {
        case 'L':
          if (neighbors === 0) {
            seats[x][y] = '#';
            occupiedIndices.push(index);
          } else {
            seats[x][y] = 'L';
          }
          break;
        case '#':
          if (neighbors >= (part === 1 ? 4 : 5)) {
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
  y: number,
  part: Part
) {
  let occupied = 0;
  for (const n of neighbors) {
    let found = false;
    let xx = x;
    let yy = y;
    while (!found) {
      xx = xx + n.x;
      yy = yy + n.y;
      const seat = tryGetSeat(xx, yy, previousSeats);
      if (seat === '#') {
        occupied++;
      }
      if (part === 1 || seat === '#' || seat === 'L' || seat === null) {
        found = true;
      }
    }
  }
  return occupied;
}

function tryGetSeat(
  x: number,
  y: number,
  previousSeats: string[][]
): string | null {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    return previousSeats[x][y];
  }
  return null;
}
