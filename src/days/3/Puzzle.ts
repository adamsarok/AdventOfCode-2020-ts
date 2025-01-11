const checkSlope = (map: string[], xSlope: number, ySlope: number): number => {
  let trees = 0;
  let x = 0, y = 0;

  while (y < map.length) {
    if (x >= map[y].length) {
      x -= map[y].length;
    }
    if (map[y][x] == '#') {
      trees++;
    }
    x += xSlope; y += ySlope;
  }
  return trees;
};

const first = (input: string) => {
  const map = input.split('\n').map(x => x.trim());
  return checkSlope(map, 3, 1);
};

const expectedFirstSolution = 7;

const second = (input: string) => {
  const map = input.split('\n').map(x => x.trim());
  return checkSlope(map, 1, 1)
    * checkSlope(map, 3, 1)
    * checkSlope(map, 5, 1)
    * checkSlope(map, 7, 1)
    * checkSlope(map, 1, 2);
};

const expectedSecondSolution = 336;

export { first, expectedFirstSolution, second, expectedSecondSolution };
