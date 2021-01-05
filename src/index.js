import { Cue } from '../packages/cue-runtime';
import script from './cue.js';
import render from './cue.tpl';
import './cue.css';

const vm = new Cue({
  script,
  render
});

vm.mount(document.querySelector('#app'));

