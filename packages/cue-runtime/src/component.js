const components = {};

function registerComponent(id, definition) {
  if (!definition) {
    return components[id]
  } else {
    definition.name = definition.name || id
    definition = createApp(definition)
    components[id] = definition
    return definition
  }
}

function resolveComponent(id) {
  return components[id];
}

export {
  registerComponent,
  resolveComponent
};