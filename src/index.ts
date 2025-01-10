import type Puzzle from './types/Puzzle';
import readFile from './utils/readFile';

const args = process.argv.slice(2);
const dayToSolve = args[0];

if (!dayToSolve) {
  console.error('No day specified run with npm run dev {day}');
  process.exit(1);
}
console.log('\x1b[34m%s\x1b[0m', `Solving Day #${args[0]}`);
(async () => {
  let input = '';
  const puzzleName = args[0];
  try {
    const puzzlePath = `src/days/${puzzleName}`;
    input = await readFile(`${puzzlePath}/input.txt`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  const { first, second }: Puzzle = await import(`./days/${puzzleName}/Puzzle`);
  let time = performance.now();
  console.log(first(input));
  console.log('\x1b[32m%s\x1b[0m', `Part1 completed in: ${(performance.now() - time).toFixed(2)} ms`);
  time = performance.now();
  console.log(second(input));
  console.log('\x1b[32m%s\x1b[0m', `Part2 completed in: ${(performance.now() - time).toFixed(2)} ms`);
})();
