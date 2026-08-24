import esbuild from 'esbuild';
import process from 'node:process';

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

const context = await esbuild.context({
  entryPoints: ['src/main.ts'],
  bundle: true,
  // platform:'node' makes esbuild treat every Node builtin as external
  // automatically, in BOTH the bare ("fs") and prefixed ("node:fs") import
  // forms — an explicit external list built from node:module's
  // builtinModules only covers the bare form and silently fails to match
  // "node:fs"-style imports, which is what this codebase actually uses
  platform: 'node',
  external: ['obsidian', 'electron'],
  format: 'cjs',
  target: 'es2020',
  logLevel: 'info',
  sourcemap: production ? false : 'inline',
  treeShaking: true,
  outfile: 'main.js',
  minify: production,
});

if (watch) {
  await context.watch();
} else {
  await context.rebuild();
  process.exit(0);
}
