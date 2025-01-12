const first = (input: string) => {
  let max = -1;
  for (const l of input.split('\n').map(x => x.trim())) {
    const bf = [0, 127];
    const lr = [0, 127];
    for (const ch of l) {
      switch (ch) {
        case 'B':
          bf[0] += Math.round((bf[1] - bf[0]) / 2);
          break;
        case 'F':
          bf[1] -= Math.round((bf[1] - bf[0]) / 2);
          break;
      }
      console.log(ch, bf);
    }
  }
  return max;
};

const expectedFirstSolution = 820;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
