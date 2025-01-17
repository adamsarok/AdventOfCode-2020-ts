const first = (input: string) => {
  // isn't this just a simple sort???
  const numbers = parseInput(input);
  let ones = 0,
    threes = 0;
  for (let i = 1; i < numbers.length; i++) {
    switch (numbers[i] - numbers[i - 1]) {
      case 1:
        ones++;
        break;
      case 3:
        threes++;
        break;
    }
  }
  return ones * threes;
};

const expectedFirstSolution = 220;

const second = (input: string) => {
  const numbers = parseInput(input);
  const waysToGetToIndex: number[] = [];
  waysToGetToIndex.push(1);
  for (let i = 1; i < numbers.length; i++) {
    let prev = i - 1;
    let result = 0;
    while (prev >= 0 && numbers[i] - numbers[prev] <= 3) {
      result += waysToGetToIndex[prev];
      prev--;
    }
    waysToGetToIndex[i] = result;
  }
  return waysToGetToIndex[waysToGetToIndex.length - 1];
};

const expectedSecondSolution = 8;

export { first, expectedFirstSolution, second, expectedSecondSolution };

function parseInput(input: string) {
  const numbers: number[] = [];
  for (const l of input.split('\n').map((x) => x.trim())) {
    numbers.push(parseInt(l));
  }
  numbers.push(0);
  numbers.sort((a, b) => a - b);
  numbers.push(numbers[numbers.length - 1] + 3);
  return numbers;
}
