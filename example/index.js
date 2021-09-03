import { createApp } from 'cue';
import script from './app/cue.js';
import render from './app/cue.tpl';
import './app/cue.css';

createApp({
  script,
  render
}).mount(document.querySelector('#app-1'));

createApp({
  script,
  render
}).mount(document.querySelector('#app-2'));

// Use 1
// app.template = render
// createApp(app).mount(document.querySelector('#app-2'));

// Use 2
// createApp(() => {
//   const data = reactive({ title: 'Reactive' })

//   function changeData(e, _data, _value) {
//     _data.title = _value
//   }

//   const Dialog = props => <div>{data.title}</div>;

//   onMounted(() => {
//     changeData(e, _data, 'mounted')
//   })

//   return (
//     <div onClick={changeData(e, data, 'change')}>
//       <Dialog></Dialog>
//     </div>
//   )
// }).mount(document.querySelector('#app-2'));

// Use 3
// const app = {
//   main () {
//     this.data = reactive({
//       title: 'Reactive'
//     })
//     return (
//       <div onClick={this.changeData}>
//         {this.data.title}
//       </div>
//     )
//   },
//   changeData () {
//     this.data.title = 'change'
//   }
// }
// createApp(() => app).mount(document.querySelector('#app-2'));
