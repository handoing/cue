import { createApp, compile } from 'cue';
import script from './app/cue.js';
import render from './app/cue.tpl';
import './app/cue.css';

createApp({
  script,
  render
}).mount(document.querySelector('#app'));

