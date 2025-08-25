import * as vscode from 'vscode';
import designTokens from '../../assets/design-tokens';
import { DesignToken } from '../types';
import { HTMLToolingSupportedLanguages } from '../constants';

export const designTokensSupportedLanguages = [
  ...HTMLToolingSupportedLanguages,
  'css',
  'scss',
  'sass',
  'less',
  'stylus',
  'postcss',
];

export function registerDesignTokensProvider() {
  return vscode.languages.registerCompletionItemProvider(
    designTokensSupportedLanguages.map((language) => ({ scheme: 'file', language })),
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.substring(0, position.character);
        // Check if we're in a style attribute or CSS/SCSS context
        const cssMatch = linePrefix.match(/var\([^)]*$/);

        if (!cssMatch) {
          return undefined;
        }

        // Create completion items for each design token
        return designTokens.map((token: DesignToken) => {
          const completionItem = new vscode.CompletionItem(token.name, vscode.CompletionItemKind.Variable);
          completionItem.detail = 'MDS Design Token';
          completionItem.documentation = new vscode.MarkdownString(`**Value:** ${token.value}`);
          completionItem.insertText = token.name;
          return completionItem;
        });
      },
    },
    ' ', // Trigger completion after space
    '"', // Trigger completion after double quote
    "'", // Trigger completion after single quote
    '(', // Trigger completion after opening parenthesis
    '-', // Trigger completion after hyphen
  );
}

export function registerDesignTokensHoverProvider() {
  return vscode.languages.registerHoverProvider(
    designTokensSupportedLanguages.map((language) => ({ scheme: 'file', language })),
    {
      provideHover(document: vscode.TextDocument, position: vscode.Position) {
        const range = document.getWordRangeAtPosition(position, /--mds_[a-zA-Z0-9_-]+/);
        if (!range) {
          return;
        }

        const token = document.getText(range);
        const designToken = designTokens.find((t) => t.name === token);

        if (designToken) {
          const hoverContent = new vscode.MarkdownString();
          hoverContent.appendMarkdown(`**MDS Design Token**\n\n`);
          hoverContent.appendMarkdown(`**Value:** \`${designToken.value}\``);
          return new vscode.Hover(hoverContent);
        }
      },
    },
  );
}
