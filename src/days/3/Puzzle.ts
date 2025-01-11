const checkSlope = (map: string[], xSlope: number, ySlope: number): number => {
  let trees = 0;
  let x = 0, y = 0;
  while (y < map.length) {
    if (x >= map[y].length - 1) {
      x -= map[y].length - 1;
    } // this is incorrect, check
    if (map[y][x] == '#') {
      trees++;
    }
    // console.log(`x${x}:y${y}->${map[y][x]}`);
    x += xSlope; y += ySlope;
  }
  console.log(`x${xSlope}:y${ySlope}->${trees}`);
  return trees;
};

const first = (input: string) => {
  const map = input.split('\n');
  return checkSlope(map, 3, 1);
};

const expectedFirstSolution = 7;

const second = (input: string) => {
  const map = input.split('\n');
  // return checkSlope(map, 1, 1);
  return checkSlope(map, 1, 1) // bad
    * checkSlope(map, 3, 1)  // ok
    * checkSlope(map, 5, 1)  // ok
    * checkSlope(map, 7, 1)  // ok
    * checkSlope(map, 1, 2); // ok
};

const expectedSecondSolution = 336;

export { first, expectedFirstSolution, second, expectedSecondSolution };
