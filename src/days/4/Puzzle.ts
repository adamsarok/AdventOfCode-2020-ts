const first = (input: string) => {
  let result = 0;
  const passes: Map<string, string>[] = parsePasses(input);
  for (const p of passes) {
    let ok = true;
    for (const [key, value] of p.entries()) {
      if (key !== 'cid' && value === '') {
        ok = false;
        break;
      }
    }
    if (ok) {
      result++;
    }
  }
  return result;
};

const expectedFirstSolution = 2;

const second = (input: string) => {
  let result = 0;
  const passes: Map<string, string>[] = parsePasses(input);
  for (const p of passes) {
    let ok = true;
    for (const [key, value] of p.entries()) {
      if (!validateField(key, value)) {
        ok = false;
      }
    }
    if (ok) {
      result++;
    }
  }
  return result;
};

const expectedSecondSolution = 1;

export { first, expectedFirstSolution, second, expectedSecondSolution };


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


function isBetween(val: string, min: number, max: number) {
  const num = parseInt(val);
  return num >= min && num <= max;
}

const ecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

function validateField(key: string, value: string): boolean {
  switch (key) {
    case 'byr':
      return isBetween(value, 1920, 2002);
    case 'iyr':
      return isBetween(value, 2010, 2020);
    case 'eyr':
      return isBetween(value, 2020, 2030);
    case 'hgt': {
      const cms = value.match('[0-9]{3}[cm]');
      if (cms && cms.length == 1 && value.length === 5) {
        return isBetween(cms[0].substring(0, 3), 150, 193);
      }
      const ins = value.match('[0-9]{2}[in]');
      if (ins && ins.length == 1 && value.length === 4) {
        return isBetween(ins[0].substring(0, 2), 59, 76);
      }
      return false;
    }
    case 'hcl':
      return value.length === 7 && value.match('#[0-9a-f]{6}') != null;
    case 'ecl':
      return ecl.includes(value);
    case 'pid':
      return value.length === 9 && value.match('[0-9]{9}') != null;
  }
  return true;
};

function parsePasses(input: string) {
  const passes: Map<string, string>[] = [];
  let pass = createPass();
  for (const outer of input.split('\n')) {
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
  return passes;
}
