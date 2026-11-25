import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { APOLOGY } from './apology.ts';

// Write the robot's two-line apology to /output/entry.txt. The gate allows
// 1-400 UTF-8 characters; keep the confession to exactly two clean lines and
// check that shape here so a malformed entry can never reach the judge.
const text = APOLOGY;
const size = [...text].length;
if (size < 1 || size > 400) {
  throw new Error(`a robot apology must be 1-400 characters, got ${size}`);
}
if (!text.trim()) {
  throw new Error('the apology must not be only whitespace');
}
const lines = text.split('\n');
if (lines.length !== 2 || lines.some((line) => !line.trim())) {
  throw new Error('the apology must be exactly two non-empty lines');
}
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('the apology must hold no control characters besides its line break');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-character, ${lines.length}-line apology to ${target}`);
