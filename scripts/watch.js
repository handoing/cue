const lernaRun = require('@lerna/run');

watch();

async function watch() {
  await lernaRun({ script: 'watch' });
}
