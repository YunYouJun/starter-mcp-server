import { z } from 'zod'
import { getAlerts } from '../lib/weather'
import { server } from '../server'

export function registerGetAlerts() {
  server.registerTool(
    'get-alerts',
    {
      title: 'Weather alerts',
      description: 'Get weather alerts for a state',
      inputSchema: z.object({
        state: z.string().length(2).describe('Two-letter state code (e.g. CA, NY)'),
      }),
    },
    async ({ state }) => {
      try {
        const result = await getAlerts(state)
        return {
          content: [
            {
              type: 'text',
              text: result.message,
            },
          ],
        }
      }
      catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: error instanceof Error ? error.message : 'Failed to retrieve alerts data',
            },
          ],
        }
      }
    },
  )
}
