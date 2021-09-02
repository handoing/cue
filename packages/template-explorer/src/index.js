import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import prettyJs from 'pretty-js';
import { tokenizer, tokenizerV2, parser, generate, generateSnabb } from 'cue-compiler';
import theme from './theme';

monaco.editor.defineTheme('my-theme', theme);
monaco.editor.setTheme('my-theme');

const sharedEditorOptions = {
  fontSize: 14,
  scrollBeyondLastLine: false,
  renderWhitespace: 'selection',
  minimap: {
    enabled: false,
  },
};

const editor = monaco.editor.create(document.getElementById('source'), {
  value: `<div>CUE</div>`,
  language: 'html',
  wordWrap: 'bounded',
  ...sharedEditorOptions,
});
editor.getModel().updateOptions({
  tabSize: 2,
});

const output = monaco.editor.create(document.getElementById('output'), {
  value: '',
  language: 'javascript',
  readOnly: true,
  ...sharedEditorOptions,
});
output.getModel().updateOptions({
  tabSize: 2,
});

editor.onDidChangeModelContent(debounce(reCompile));
reCompile();

function compile(source) {
  const tokens = tokenizerV2(source);
  const ast = parser(tokens);
  const code = generateSnabb(ast);
  return { ast, code };
}

function compileCode(source) {
  let lastSuccessfulCode = '';
  console.clear();
  const start = performance.now();
  const { code, ast } = compile(source);
  console.log(`Compiled in ${(performance.now() - start).toFixed(2)}ms.`);
  console.log(`AST: `, ast);
  lastSuccessfulCode = code + `\n\n// Check the console for the AST`;
  return lastSuccessfulCode;
}

function reCompile() {
  const src = editor.getValue();
  const res = compileCode(src);
  if (res) {
    output.setValue(prettyJs(res));
  }
}

function debounce(fn, delay = 300) {
  let prevTimer;
  return (...args) => {
    if (prevTimer) {
      clearTimeout(prevTimer);
    }
    prevTimer = window.setTimeout(() => {
      fn(...args);
      prevTimer = null;
    }, delay);
  };
}
