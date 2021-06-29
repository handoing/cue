const lernaRun = require('@lerna/run');

runTemplateExplorer();

async function runTemplateExplorer() {
  await lernaRun({ script: 'dev:parcel' });
}
