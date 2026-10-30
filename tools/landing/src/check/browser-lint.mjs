import {
  WASI,
  File,
  Directory,
  OpenFile,
  PreopenDirectory,
  ConsoleStdout,
} from '@bjorn3/browser_wasi_shim';

function treeDirectory(files) {
  const root = new Directory([]);
  for (const file of files) {
    const parts = file.path.split('/').filter(Boolean);
    let dir = root;
    for (let i = 0; i < parts.length - 1; i += 1) {
      let next = dir.contents.get(parts[i]);
      if (!next) {
        next = new Directory([]);
        dir.contents.set(parts[i], next);
      }
      dir = next;
    }
    dir.contents.set(parts.at(-1), new File(new TextEncoder().encode(file.text)));
  }
  return root.contents;
}

/**
 * Run the pinned specscore-cli lint package.
 * @param {BufferSource | WebAssembly.Module} wasm
 * @param {{ path: string, text: string }[]} files files under the project root
 * @param {{ catalog?: boolean }} [options]
 */
export async function runLintWasm(wasm, files, options = {}) {
  const module = wasm instanceof WebAssembly.Module ? wasm : await WebAssembly.compile(wasm);
  let stdout = '';
  let stderr = '';
  const args = options.catalog ? ['webcheck', '--catalog'] : ['webcheck', '/work/spec', '/work'];
  const wasi = new WASI(args, [], [
    new OpenFile(new File([])),
    ConsoleStdout.lineBuffered((line) => { stdout += `${line}\n`; }),
    ConsoleStdout.lineBuffered((line) => { stderr += `${line}\n`; }),
    new PreopenDirectory('/work', files?.length ? treeDirectory(files) : new Map()),
  ], { debug: false });
  const instance = await WebAssembly.instantiate(module, { wasi_snapshot_preview1: wasi.wasiImport });
  const code = wasi.start(instance);
  if (code !== 0) {
    throw new Error(stderr.trim() || `specscore spec lint exited ${code}`);
  }
  const parsed = JSON.parse(stdout);
  if (!options.catalog && !Array.isArray(parsed.violations)) parsed.violations = [];
  return parsed;
}
