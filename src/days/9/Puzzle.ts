const first = (input: string) => {
  const numbers: number[] = [];
  for (const l of input.split('\n').map((x) => x.trim())) {
    numbers.push(parseInt(l));
  }
  const windowLen = numbers.length < 100 ? 5 : 25;
  for (let t = windowLen; t < numbers.length; t++) {
    if (!checkNum(t, numbers, windowLen)) {
      return numbers[t];
    }
  }
  return -1;
};

const expectedFirstSolution = 127;

const second = (input: string) => {
  const numbers: number[] = [];
  for (const l of input.split('\n').map((x) => x.trim())) {
    numbers.push(parseInt(l));
  }
  const toFind = first(input);
  let windowStart = 0,
    windowEnd = 0;
  let window = numbers[windowStart];
  while (windowEnd < numbers.length) {
    if (window === toFind) {
      const w = numbers.slice(windowStart, windowEnd);
      return Math.min(...w) + Math.max(...w);
    } else if (window < toFind) {
      windowEnd++;
      window += numbers[windowEnd];
    } else {
      window -= numbers[windowStart];
      windowStart++;
    }
  }
  return -1;
};

const expectedSecondSolution = 62;

export { first, expectedFirstSolution, second, expectedSecondSolution };

function checkNum(t: number, numbers: number[], windowLen: number) {
  const target = numbers[t];
  for (let a = t - windowLen; a < t - 1; a++) {
    const aNum = numbers[a];
    for (let b = t - windowLen + 1; b < t; b++) {
      if (target === aNum + numbers[b]) {
        return true;
      }
    }
  }
  return false;
}
