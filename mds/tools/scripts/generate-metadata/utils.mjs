import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Get complete package information from a specific package.json file
 * @param {string} packagePath - Path to the package.json file
 * @returns {object} Package information object with name, version, description, homepage, and repository
 */
export function getPackageInfo(packagePath, enhancedData = {}) {
  try {
    const packageData = JSON.parse(readFileSync(packagePath, 'utf8'));
    return {
      packageName: packageData.name || 'unknown-package',
      packageVersion: packageData.version || '0.0.0',
      description: packageData.description || enhancedData.description || 'Package description not available',
      homepage: packageData.homepage || 'https://designsystem.maersk.com',
      repository: packageData.repository || null,
      ...enhancedData,
    };
  } catch (error) {
    console.warn(`⚠️  Could not read package.json at ${packagePath}, using defaults`);
    return {
      name: 'unknown-package',
      version: '0.0.0',
      description: 'Package description not available',
      homepage: null,
      repository: null,
    };
  }
}
