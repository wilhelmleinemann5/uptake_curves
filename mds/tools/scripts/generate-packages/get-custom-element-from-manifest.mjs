export function getAllComponents(metadata) {
  const allComponents = [];
  metadata.modules.map((module) => {
    module.declarations?.map((declaration) => {
      if (declaration.customElement) {
        const component = declaration;
        const modulePath = module.path;
        const isSubComponent = modulePath.includes('/components/');
        if (component && !isSubComponent) {
          allComponents.push(Object.assign(component, { modulePath }));
        }
      }
    });
  });

  return allComponents;
}
