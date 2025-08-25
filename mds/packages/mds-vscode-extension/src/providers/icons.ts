import * as vscode from 'vscode';
import { iconNames } from '../../assets/icons';
import { HTMLToolingSupportedLanguages } from '../constants';

export function registerIconProvider() {
  return vscode.languages.registerCompletionItemProvider(
    HTMLToolingSupportedLanguages.map((language) => ({ scheme: 'file', language })),
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.substring(0, position.character);

        // Check if we're in an mc- component and in an icon attribute
        if (!isInMdsComponent(linePrefix) || !isInIconAttribute(linePrefix)) {
          return [];
        }

        return iconNames.map((name) => {
          const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Value);
          item.detail = `MDS icon: ${name}`;
          const documentation = new vscode.MarkdownString();
          documentation.isTrusted = true;
          documentation.appendMarkdown(
            'All icons with a preview are available on our [website](https://designsystem.maersk.com/icons)',
          );
          item.documentation = documentation;
          return item;
        });
      },
    },
    '"', // Trigger completion after typing quote
    "'", // Trigger completion after typing single quote
  );
}

function isInMdsComponent(linePrefix: string): boolean {
  return /<mc-[a-zA-Z-]*(?:\s+[^>]*)?$/.test(linePrefix);
}

function isInIconAttribute(linePrefix: string): boolean {
  return /icon=["']?[^"']*$/.test(linePrefix);
}
