import * as vscode from 'vscode';
import { HTMLToolingSupportedLanguages } from '../constants';
import {
  gridClasses,
  breadcrumbClasses,
  colorClasses,
  gapClasses,
  linkClasses,
  tableClasses,
  typographyClasses,
} from '../../assets/css-classes';

function createCompletionProvider(classes: string[], type: string) {
  return vscode.languages.registerCompletionItemProvider(
    HTMLToolingSupportedLanguages.map((language) => ({ scheme: 'file', language })),
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.substring(0, position.character);
        // Check if we're inside a class or className attribute
        const classMatch = linePrefix.match(/class=["'][^"']*$/);
        const classNameMatch = linePrefix.match(/className=["'][^"']*$/);

        if (!classMatch && !classNameMatch) {
          return undefined;
        }

        return classes.map((className) => {
          const completionItem = new vscode.CompletionItem(className, vscode.CompletionItemKind.Value);
          completionItem.detail = `MDS ${type} Class`;
          completionItem.documentation = new vscode.MarkdownString(
            `Applies the ${className} ${type.toLowerCase()} class from Maersk Design System`,
          );

          // Add sortText for any class name containing numbers
          const number = className.match(/\d+/)?.[0];
          if (number) {
            // Get the prefix before the number to group similar classes together
            const prefix = className.split(number)[0];
            // Pad the number with zeros to ensure correct string sorting
            // Combine prefix with padded number for consistent sorting within groups
            completionItem.sortText = `${prefix}${number.padStart(4, '0')}`;
          }

          return completionItem;
        });
      },
    },
    // By default users can also trigger the IntelliSense by pressing ctrl + space on Windows or option + ESC on Mac.
    ' ', // Trigger completion after space
    '"', // Trigger completion after double quote
    "'", // Trigger completion after single quote
  );
}

export function registerCSSClassesProviders(): vscode.Disposable[] {
  return [
    createCompletionProvider(gridClasses, 'Grid'),
    createCompletionProvider(breadcrumbClasses, 'Breadcrumb'),
    createCompletionProvider(colorClasses, 'Color'),
    createCompletionProvider(gapClasses, 'Gap'),
    createCompletionProvider(linkClasses, 'Link'),
    createCompletionProvider(tableClasses, 'Table'),
    createCompletionProvider(typographyClasses, 'Typography'),
  ];
}
