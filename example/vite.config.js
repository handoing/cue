const path = require('path')
const cuePlugin = require('./plugin/vite-plugin-cue-transform')
const cueSourcePath = path.resolve(__dirname, '../packages/cue')
console.log(cuePlugin);
export default {
  root: __dirname,
  server: {
    port: 3360,
    open: true
  },
  resolve: {
    alias: {
      'cue': cueSourcePath
    }
  },
  plugins: [
    cuePlugin()
  ]
}
