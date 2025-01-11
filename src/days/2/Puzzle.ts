type Pass = {
  pass: string;
  range1: number;
  range2: number;
  char: string;
}

const parsePass = (l: string): Pass => {
  const pass = l.split(':')[1].trim();
  const rule = l.split(':')[0];
  const range = rule.split(' ')[0].split('-');
  const char = rule.split(' ')[1].trim()[0];
  return {
    pass,
    range1: parseInt(range[0]),
    range2: parseInt(range[1]),
    char
  };
};

const first = (input: string) => {
  let okPasses = 0;
  for (const l of input.split('\n')) {
    const pass = parsePass(l);
    const found = pass.pass.split(pass.char).length - 1;
    if (found >= pass.range1 && found <= pass.range2) {
      okPasses++;
    }
  }
  return okPasses;
};

const expectedFirstSolution = 2;

const second = (input: string) => {
  let okPasses = 0;
  for (const l of input.split('\n')) {
    const pass = parsePass(l);
    const first = pass.pass[pass.range1 - 1] == pass.char;
    const second = pass.pass[pass.range2 - 1] == pass.char;
    if (first != second) {
      okPasses++;
    }
  }
  return okPasses;
};

const expectedSecondSolution = 1;

export { first, expectedFirstSolution, second, expectedSecondSolution };
