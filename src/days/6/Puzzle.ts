const first = (input: string) => {
  let result = 0;
  let set = new Set<string>();
  for (const l of input.split('\n').map((x) => x.trim())) {
    if (l === '') {
      result += set.size;
      set = new Set<string>();
    } else {
      for (const c of l) {
        set.add(c);
      }
    }
  }
  result += set.size;
  return result;
};

const expectedFirstSolution = 11;

const second = (input: string) => {
  let result = 0;
  let set = new Map<string, number>();
  let grouplen = 0;
  for (const l of input.split('\n').map((x) => x.trim())) {
    if (l === '') {
      result += Array.from(set.entries()).filter(
        (x) => x[1] == grouplen
      ).length;
      grouplen = 0;
      set = new Map<string, number>();
    } else {
      grouplen++;
      for (const c of l) {
        const prev = set.get(c) || 0;
        set.set(c, prev + 1);
      }
    }
  }
  result += Array.from(set.entries()).filter((x) => x[1] == grouplen).length;
  return result;
};

const expectedSecondSolution = 6;

export { first, expectedFirstSolution, second, expectedSecondSolution };
