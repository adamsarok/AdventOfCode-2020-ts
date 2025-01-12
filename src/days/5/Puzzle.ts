const first = (input: string) => {
  let max = -1;
  for (const l of input.split('\n').map((x) => x.trim())) {
    const { row, column } = parseSeat(l);
    max = Math.max(row * 8 + column, max);
  }
  return max;
};

const expectedFirstSolution = 357;

const second = (input: string) => {
  const occupied: boolean[][] = Array.from({ length: 128 }, () =>
    Array(8).fill(false)
  );
  for (const l of input.split('\n').map((x) => x.trim())) {
    const seat = parseSeat(l);
    occupied[seat.row][seat.column] = true;
  }

  for (let y = 1; y < 127; y++) {
    for (let x = 0; x < 8; x++) {
      if (!occupied[y][x] && occupied[y - 1][x] && occupied[y + 1][x]) {
        return y * 8 + x;
      }
    }
  }
  return -1;
};

const expectedSecondSolution = 539;

export { first, expectedFirstSolution, second, expectedSecondSolution };

function parseSeat(l: string) {
  const bf = [0, 127];
  const lr = [0, 7];
  for (const ch of l) {
    switch (ch) {
      case 'B':
        bf[0] += Math.round((bf[1] - bf[0]) / 2);
        break;
      case 'F':
        bf[1] -= Math.round((bf[1] - bf[0]) / 2);
        break;
      case 'R':
        lr[0] += Math.round((lr[1] - lr[0]) / 2);
        break;
      case 'L':
        lr[1] -= Math.round((lr[1] - lr[0]) / 2);
        break;
    }
    // console.log(ch, bf, lr);
  }
  if (bf[0] !== bf[1] || lr[0] !== lr[1]) {
    throw `Binary search failed, incorrect range(s): ${bf} ${lr}`;
  }
  return { row: bf[0], column: lr[0] };
}
