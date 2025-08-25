/**
 * Tool for generating component installation commands for MDS
 */

import { serverResponse } from "../../utils/utils";
import { jsFrameworks } from "../components/types";

/**
 * Interface for component installation tool arguments
 */
export interface InstallComponentArgs {
  /** Package manager to use (npm, yarn, pnpm) */
  packageManager?: "npm" | "yarn" | "pnpm";
  framework?: jsFrameworks | string;
}

/**
 * Install component tool definition
 */
export const installComponentTool = {
  name: "get_install_documentation",
  description: "Generates installation commands for MDS packages",
  inputSchema: {
    type: "object",
    properties: {
      packageManager: {
        type: "string",
        description: "Package manager to use (npm, yarn, pnpm)",
        enum: ["npm", "yarn", "pnpm"],
      },
    },
  },
  handler: async (args: InstallComponentArgs) => {
    const packageManager = args.packageManager || "npx";
    const framework = args.framework || "vue";

    // Build the installation command based on the package manager
    let baseCommand: string;

    switch (packageManager) {
      case "npm":
        baseCommand = `npm i @maersk-global/mds-${
          framework === "react" || framework === "nextjs"
            ? "react-wrapper"
            : "components-core"
        } @maersk-global/mds-foundations @maersk-global/mds-design-tokens @maersk-global/icons @maersk-global/fonts`;
        break;
      case "yarn":
        baseCommand = `yarn add @maersk-global/mds-${
          framework === "react" || framework === "nextjs"
            ? "react-wrapper"
            : "components-core"
        } @maersk-global/mds-foundations @maersk-global/mds-design-tokens @maersk-global/icons @maersk-global/fonts`;
        break;
      case "pnpm":
        baseCommand = `pnpm add @maersk-global/mds-${
          framework === "react" || framework === "nextjs"
            ? "react-wrapper"
            : "components-core"
        } @maersk-global/mds-foundations @maersk-global/mds-design-tokens @maersk-global/icons @maersk-global/fonts`;
        break;
      default:
        baseCommand = `npm i @maersk-global/mds-${
          framework === "react" || framework === "nextjs"
            ? "react-wrapper"
            : "components-core"
        } @maersk-global/mds-foundations @maersk-global/mds-design-tokens @maersk-global/icons @maersk-global/fonts`;
    }

    const data = {
      packageManager,
      baseCommand,
      example: `${baseCommand}`,
      instructions:
        "Run one of these commands in your project directory to install all necessary MDS packages for using components, css styles, fonts, icons, page layouts and grid system.",
    };
    return serverResponse(
      "get_install_documentation",
      `install-${args.packageManager}`,
      data
    );
  },
};
