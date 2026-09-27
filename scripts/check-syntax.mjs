import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
for (const file of ['server.mjs', ...readdirSync('dist/js').filter(x => x.endsWith('.js')).map(x => `dist/js/${x}`)]) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log('Syntax OK: local server and all browser modules.');
