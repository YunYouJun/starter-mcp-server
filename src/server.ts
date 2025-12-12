import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import pkg from '../package.json'

// Create server instance
export const server = new McpServer({
  name: pkg.name || 'starter-mcp-server',
  version: pkg.version || '0.1.0',
})
