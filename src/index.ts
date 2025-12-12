import process from 'node:process'

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { server } from './server'
import { registerGetAlerts } from './tools/get-alerts'
import { registerGetForecast } from './tools/get-forecast'

// Register weather tools
registerGetAlerts()
registerGetForecast()

// Start the server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Weather MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
