import { isServer } from 'lit';

declare global {
  interface Window {
    MdsConfig: {
      _iconsDynamicImportPath: string | null;
      _isInitialized: boolean;
    };
  }
}

export class MdsConfig {
  private static _ssrFallbackPath: string | null = null;

  private static initializeGlobal(): void {
    if (!isServer && !window.MdsConfig) {
      window.MdsConfig = {
        _iconsDynamicImportPath: null,
        _isInitialized: false,
      };
    }
  }

  public static get iconsDynamicImportPath(): string | null {
    if (isServer) {
      return this._ssrFallbackPath;
    }

    this.initializeGlobal();
    const path = window.MdsConfig._iconsDynamicImportPath;

    return path;
  }

  public static set iconsDynamicImportPath(path: string | null) {
    if (isServer) {
      this._ssrFallbackPath = path;
      return;
    }

    this.initializeGlobal();
    window.MdsConfig._iconsDynamicImportPath = path;
    window.MdsConfig._isInitialized = true;

    if (!path) {
      console.warn(
        '[MdsConfig] Setting icons path to null. This may cause issues:\n' +
          '1. Icons will not be rendered properly\n' +
          '2. mc-icon component will fall back to empty icon\n' +
          '3. Dynamic imports will fail\n' +
          'Please provide a valid path to your icons directory.',
      );
    }
  }
}
