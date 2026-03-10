import process from 'node:process'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { server } from './server'
import { registerGetAlerts } from './tools/get-alerts'
import { registerGetForecast } from './tools/get-forecast'

// Export server and business logic for programmatic use
export { server }
export { getAlerts, getForecast } from './lib/weather'

/**
 * Start the MCP server
 */
export async function startServer() {
  try {
    // Register all tools
    registerGetAlerts()
    registerGetForecast()

    // Start the server
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.error('MCP Server running on stdio')
  }
  catch (error) {
    console.error('Fatal error starting server:', error)
    process.exit(1)
  }
}

// Only start server when run directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer()
}
