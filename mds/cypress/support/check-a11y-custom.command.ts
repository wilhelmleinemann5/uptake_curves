const severityIndicators = {
  minor: '⚪',
  moderate: '🟡',
  serious: '🟠',
  critical: '🔴',
};

const checkA11yCallback = (violations): void => {
  violations.forEach((violation) => {
    const nodes = Cypress.$(violation.nodes.map((node) => node.target).join(','));

    Cypress.log({
      name: `${severityIndicators[violation.impact]} ${violation.impact} A11Y`,
      consoleProps: () => violation,
      $el: nodes,
      message: `[${violation.help}](${violation.helpUrl})`,
    });

    violation.nodes.forEach(({ target }) => {
      Cypress.log({
        name: '🔧 ',
        consoleProps: () => violation,
        $el: Cypress.$(target.join(',')),
        message: target,
      });
    });
  });
};

// const A11Y_OPTIONS: any = {
//   runOnly: {
//     type: 'tag',
//     values: [
//       'wcag2a',
//       'wcag2aa',
//       'wcag411',
//       'wcag412',
//       'wcag143',
//       'wcag1412',
//       'cat.color',
//       'cat.aria',
//       'cat.name-role-value',
//       'section508',
//       'section508.22.a',
//       'ACT',
//       'cat.parsing',
//     ],
//   },
// };

const printAccessibilityErrors = (violations) => {
  let returnString = '\n\x1b[31mACCESSIBILITY ERRORS:\x1b[0m\n';
  violations.forEach((element) => {
    returnString += `\x1b[31m${element.id} - ${element.impact}\x1b[0m\n`;
    element.nodes.forEach((item, index) => {
      item.target.forEach((i) => {
        returnString += `\x1b[33m${index} - ${i}\x1b[0m\n`;
      });
    });
  });
  return returnString;
};
Cypress.Commands.add('checkA11yCustom', (context = null, options = null, callback = null) => {
  cy.checkA11y(context, options, (violations) => {
    checkA11yCallback(violations);
    if (callback) callback();
    Cypress.on('fail', (error) => {
      console.log(printAccessibilityErrors(violations));
      throw error;
    });
  });
});
