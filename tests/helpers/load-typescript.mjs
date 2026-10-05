import { readFileSync } from 'node:fs';
import Module, { createRequire } from 'node:module';
import path from 'node:path';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '../..');
const cache = new Map();

// Execute real project modules using the installed compiler and its path alias.
export function loadTypescript(relativePath) {
  const filename = path.resolve(root, relativePath);
  if (cache.has(filename)) return cache.get(filename).exports;
  const loadedModule = new Module(filename);
  cache.set(filename, loadedModule);
  loadedModule.filename = filename;
  loadedModule.paths = Module._nodeModulePaths(path.dirname(filename));
  loadedModule.require = (specifier) => specifier.startsWith('@/')
    ? loadTypescript(`src/${specifier.slice(2)}.ts`)
    : require(specifier);
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    fileName: filename,
  });
  loadedModule._compile(outputText, filename);
  return loadedModule.exports;
}
