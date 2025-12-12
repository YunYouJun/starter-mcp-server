import type { AlertsResponse } from '../types'
import { z } from 'zod'
import { NWS_API_BASE } from '../constants'
import { server } from '../server'
import { formatAlert, makeNWSRequest } from '../utils'

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
      const stateCode = state.toUpperCase()
      const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`
      const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl)

      if (!alertsData) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to retrieve alerts data',
            },
          ],
        }
      }

      const features = alertsData.features || []
      if (features.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `No active alerts for ${stateCode}`,
            },
          ],
        }
      }

      const formattedAlerts = features.map(formatAlert)
      const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join('\n')}`

      return {
        content: [
          {
            type: 'text',
            text: alertsText,
          },
        ],
      }
    },
  )
}
