const lernaRun = require('@lerna/run');

build();

async function build() {
  await lernaRun({ script: 'build' });
}