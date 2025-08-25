import { html } from 'lit';
import docsOne from './notes/docs1.png';
import docsFour from './notes/docs4.png';
import docsFive from './notes/docs5.png';
import { renderExperimentalBanner } from '@maersk-global/mds-dev-utils';

export default {
  title: 'Experiments/Developer Utilities',
  parameters: {
    preview: { disable: true },
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const AIHelp = () => {
  const content = `<div class="story-notification"><mc-notification
      icon="chemistry-beakers"
      heading="Feature is available for early adoption"
      appearance="warning"
    >
      <p>The tool is ready for you to try—enjoy exploring, but be mindful it may change or have limitations. 
      Some code suggestions from Copilot agent may not be fully accurate, so be mindful and always check your code before releasing to production.</p>
    </mc-notification></div>`;
  return html`${renderExperimentalBanner(content)}
    <div class="mds-content">
      <h2>🤖 AI Help by providing context to AI Agent</h2>
      <p>
        The MDS-MCP Server is a TypeScript-based application that utilizes the Model Context Protocol SDK to handle
        incoming requests when using Copilot Agent (Claude model). It integrates with locally installed MDS packages,
        that consists of rich meta data information, to retrieve all components properties, events, examples and
        guidelines, and provides this information back to the Copilot Agent in a structured format.
      </p>

      <h3>Installing MDS MCP Server</h3>
      <p>
        Install the <b>@maersk-global/mds-mcp-server</b> package in your local project by running the following command
        (works from <b>v2.134.3</b> onwards):
      </p>
      <mc-c-code-preview
        variant="none"
        .code=${[
          {
            language: 'plainText',
            template: 'npm i -D @maersk-global/mds-mcp-server',
          },
        ]}
      >
      </mc-c-code-preview>

      <h3>Using MDS MCP Server in your local project</h3>
      <p>1. For VS Code create in the root of your project <b>.vscode/mcp.json</b> file that contains following:</p>
      <mc-c-code-preview
        variant="none"
        .code=${[
          {
            language: 'json',
            template: `{
  "servers": {
    "mds": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@maersk-global/mds-mcp-server"],
    }
  }
}`,
          },
        ]}
      >
      </mc-c-code-preview>
      <p>
        2. Start MDS MCP server in your project by opening your local <code>.vscode/mcp.json</code> file and clicking on
        start:
      </p>

      <img src="${docsOne}" alt="MDS MCP Server Tools" width="480" />

      <p>
        3. Now you are <b>ready</b> to start asking Copilot Agent (Claude model) how to use MDS components and styles in
        your project.
      </p>
      <br />
      <br />
      <br />
      <br />
      <h3>Extra - Want to test responses from your local MDS MCP server?</h3>
      <p>
        The MCP Server provides several endpoints for retrieving documentation and code examples from MDS packages
        installed in your project's node_modules folder. All interactions are done through JSON-RPC requests over stdio.
        For testing, you can run:
      </p>
      <mc-c-code-preview
        variant="none"
        .code=${[
          {
            language: 'plainText',
            template: 'npx @modelcontextprotocol/inspector npx @maersk-global/mds-mcp-server',
          },
        ]}
      >
      </mc-c-code-preview>
      <p>
        In order to start inspecting available documentation, please click on Connect button in Inspector UI, select
        Tools from the top bar and click on List Tools.
      </p>

      <img src="${docsFour}" alt="MDS MCP Server Tools" width="600" />

      <img src="${docsFive}" alt="MDS MCP Server Tools" width="600" />

      <h4>Available endpoints:</h4>
      <h5>get_design_tokens_documentation</h5>
      <p>Gets MDS documentation for using design tokens - background colors, text colors, borders, shadows, etc.</p>
      <h5>get_layout_patterns_documentation</h5>
      <p>Gets MDS page layout patterns documentation for building accessible page layouts.</p>
      <h5>get_css_grid_documentation</h5>
      <p>
        Gets MDS CSS grid documentation for using grid system in UI projects. Provides css classes for columns, rows,
        spanning cells, gaps, etc.
      </p>
      <h5>get_css_styles_documentation</h5>
      <p>
        Gets MDS CSS styles documentation for using approved css styles in UI projects. Provides css classes for colors,
        borders, shadows, fonts, etc.
      </p>
      <h5>get_components_documentation</h5>
      <p>Gets MDS documentation for using MDS components.</p>
      <h5>get_setup_documentation</h5>
      <p>
        Gets MDS documentation on how to setup MDS in projects. It can return the README or mds-config for setting up
        icons path.
      </p>
      <h5>get_install_documentation</h5>
      <p>Generates installation commands for MDS packages.</p>

      <h4>Error Handling</h4>
      <p>If an error occurs, the server will respond with an error object:</p>
      <mc-c-code-preview
        variant="none"
        .code=${[
          {
            language: 'json',
            template: `{ 
  "jsonrpc": "2.0", 
  "id": 1, 
  "error": {
    "code": -32603, 
    "message": "Error message details" 
  } 
}`,
          },
        ]}
      >
      </mc-c-code-preview>
    </div> `;
};
