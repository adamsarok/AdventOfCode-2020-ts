const first = (input: string) => {
  const nums: number[] = [];
  for (const i of input.split('\n')) {
    const num = parseInt(i);
    if (nums.includes(2020 - num)) {
      return num * (2020 - num);
    }
    nums.push(num);
  }
  return -1;
};

const expectedFirstSolution = 514579;

const second = (input: string) => {
  const nums = input.split('\n').map((i) => parseInt(i));
  for (const n1 of nums) {
    for (const n2 of nums) {
      if (n1 === n2 || n1 + n2 > 2020) {
        continue;
      }
      for (const n3 of nums) {
        if (n1 === n3 || n2 === n3) {
          continue;
        }
        if (n1 + n2 + n3 === 2020) {
          return n1 * n2 * n3;
        }
      }
    }
  }
  return -1;
};

const expectedSecondSolution = 241861950;

export { first, expectedFirstSolution, second, expectedSecondSolution };
