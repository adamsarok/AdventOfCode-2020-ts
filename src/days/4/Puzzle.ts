function createPass(): Map<string, string> {
  return new Map([
    ['byr', ''],
    ['iyr', ''],
    ['eyr', ''],
    ['hgt', ''],
    ['hcl', ''],
    ['ecl', ''],
    ['pid', ''],
    ['cid', '']
  ]);
}

const first = (input: string) => {
  let result = 0;
  const passes: Map<string, string>[] = [];
  let pass = createPass();
  for (const outer of input.split('\n')) {
    console.log(outer);
    if (outer.trim() === '') {
      passes.push(pass);
      pass = createPass();
    }
    for (const inner of outer.split(' ')) {
      const [key, value] = inner.split(':');
      if (key !== '\r') {
        pass.set(key, value.trim());
      }
    }
  }
  passes.push(pass);
  // console.log(passes);
  for (const p of passes) {
    let ok = true;
    for (const [key, value] of p.entries()) {
      if (key !== 'cid' && value === '') {
        ok = false;
        console.log('missing', key, p);
        break;
      }
    }
    if (ok) {
      console.log('ok', p);
      result++;
    }
  }
  return result;
};

const expectedFirstSolution = 2;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
