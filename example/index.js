import { Cue } from 'cue';
import script from './app/cue.js';
import render from './app/cue.tpl';
import './app/cue.css';

const vm = new Cue({
  script,
  render
});

vm.mount(document.querySelector('#app'));

