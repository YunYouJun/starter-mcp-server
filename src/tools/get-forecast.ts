import { z } from 'zod'
import { getForecast } from '../lib/weather'
import { server } from '../server'

export function registerGetForecast() {
  server.registerTool(
    'get-forecast',
    {
      title: 'Weather forecast',
      description: 'Get weather forecast for a location',
      inputSchema: z.object({
        latitude: z.number().min(-90).max(90).describe('Latitude of the location'),
        longitude: z
          .number()
          .min(-180)
          .max(180)
          .describe('Longitude of the location'),
      }),
    },
    async ({ latitude, longitude }) => {
      try {
        const result = await getForecast(latitude, longitude)
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
              text: error instanceof Error ? error.message : 'Failed to retrieve forecast data',
            },
          ],
        }
      }
    },
  )
}
