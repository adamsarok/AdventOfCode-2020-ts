const first = (input: string) => {
  const parentKeys: Set<string> = new Set<string>();
  const bags = parseBags(input);
  for (const s of bags.filter((x) =>
    Array.from(x.bags.entries()).some(([key]) => key === 'shiny gold bags')
  )) {
    addParents(s, bags, parentKeys);
  }
  return parentKeys.size;
};

const expectedFirstSolution = 4;

const second = (input: string) => {
  const bags = parseBags(input);
  const start = bags.find((x) => x.key === 'shiny gold bags');
  if (start) {
    return traverse(start, bags, 1) - 1;
  }
  return -1;
};

const expectedSecondSolution = 126;

export { first, expectedFirstSolution, second, expectedSecondSolution };

type Bag = {
  key: string;
  bags: Map<string, number>;
};

function parseBags(input: string) {
  const bags: Bag[] = [];
  for (const l of input.split('\n').map((x) => x.trim())) {
    const bagStr = l.split('contain').map((x) => x.trim());
    const bag: Bag = {
      key: bagStr[0],
      bags: new Map<string, number>(),
    };
    const inner = bagStr[1].split(',').map((x) => x.trim());
    for (let i = 0; i < inner.length; i++) {
      const num = parseInt(inner[i].substring(0, 1));
      let key = inner[i].substring(2);
      if (key.endsWith('.')) {
        key = key.substring(0, key.length - 1);
      }
      if (!key.endsWith('s')) {
        key = `${key}s`; // :-(
      }
      bag.bags.set(key, num);
    }
    bags.push(bag);
  }
  return bags;
}

function addParents(bag: Bag, bags: Bag[], parentKeys: Set<string>) {
  parentKeys.add(bag.key);
  for (const parent of bags.filter((x) =>
    Array.from(x.bags.entries()).some(([key]) => key === bag.key)
  )) {
    addParents(parent, bags, parentKeys);
  }
}

function traverse(bag: Bag, bags: Bag[], cnt: number): number {
  let result = cnt;
  for (const child of bag.bags) {
    const c = bags.find((x) => x.key === child[0]);
    if (c) {
      result += traverse(c, bags, child[1] * cnt);
    }
  }
  return result;
}
