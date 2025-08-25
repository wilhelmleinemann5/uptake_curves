import * as vscode from 'vscode';
import { registerCSSClassesProviders } from './providers/foundations-classes';
import { registerDesignTokensProvider, registerDesignTokensHoverProvider } from './providers/design-tokens';
import { registerIconProvider } from './providers/icons';

export function activate(context: vscode.ExtensionContext) {
  const cssClassesProviders = registerCSSClassesProviders();
  const designTokensProvider = registerDesignTokensProvider();
  const designTokensHoverProvider = registerDesignTokensHoverProvider();
  const iconProvider = registerIconProvider();

  context.subscriptions.push(...cssClassesProviders, designTokensProvider, designTokensHoverProvider, iconProvider);
}
