import * as esbuild from 'esbuild';

async function build() {
  await esbuild.build({
    entryPoints: ['server.ts'],
    bundle: true,
    platform: 'node',
    target: 'node22',
    outfile: 'dist/server.cjs',
    format: 'cjs',
    external: ['vite', '@google/genai', 'express', 'dotenv'], // Keep these external to avoid bloating and issues with dynamic imports
  });
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
