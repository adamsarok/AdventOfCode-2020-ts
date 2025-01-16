const first = (input: string) => {
  const commands: Command[] = parseCommands(input);
  const result = runUntilLoop(commands);
  return result.acc;
};

const expectedFirstSolution = 5;

const second = (input: string) => {
  const commands: Command[] = parseCommands(input);
  let actSwitch = 0;
  while (actSwitch < commands.length) {
    const cmd = commands[actSwitch].cmd;
    let sw = false;
    switch (cmd) {
      case CommandType.Jmp:
        commands[actSwitch].cmd = CommandType.Nop;
        sw = true;
        break;
      case CommandType.Nop:
        commands[actSwitch].cmd = CommandType.Jmp;
        sw = true;
        break;
    }
    if (sw) {
      const res = runUntilLoop(commands);
      if (res.result === 'finished') {
        return res.acc;
      }
      commands[actSwitch].cmd = cmd;
    }
    actSwitch++;
  }
  return -1;
};

const expectedSecondSolution = 8;

export { first, expectedFirstSolution, second, expectedSecondSolution };

enum CommandType {
  Nop = 'nop',
  Jmp = 'jmp',
  Acc = 'acc',
}
type Command = {
  cmd: CommandType;
  val: number;
};
type Result = {
  result: 'loop' | 'finished';
  acc: number;
};
function runUntilLoop(commands: Command[]): Result {
  let acc = 0;
  let instrPointer = 0;
  const visited = new Set<number>();
  while (!visited.has(instrPointer) && instrPointer < commands.length) {
    visited.add(instrPointer);
    const cmd = commands[instrPointer];
    switch (cmd.cmd) {
      case CommandType.Nop:
        instrPointer++;
        break;
      case CommandType.Jmp:
        instrPointer += cmd.val;
        break;
      case CommandType.Acc:
        acc += cmd.val;
        instrPointer++;
        break;
    }
  }
  return { result: instrPointer < commands.length ? 'loop' : 'finished', acc };
}

function parseCommands(input: string) {
  const commands: Command[] = [];
  for (const l of input.split('\n').map((x) => x.trim())) {
    const op = l.split(' ');
    const val = parseInt(op[1]);
    commands.push({ cmd: op[0] as CommandType, val });
  }
  return commands;
}
