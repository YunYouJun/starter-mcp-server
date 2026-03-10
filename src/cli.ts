#!/usr/bin/env node
import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { startServer } from './index'
import { getAlerts, getForecast } from './lib/weather'

// CLI 命令定义
const cli = yargs(hideBin(process.argv))
  .scriptName('starter-mcp-server')
  .command(
    'get-alerts <state>',
    'Get weather alerts for a state',
    (yargs) => {
      return yargs.positional('state', {
        describe: 'Two-letter state code (e.g. CA, NY)',
        type: 'string',
        demandOption: true,
      })
    },
    async (argv) => {
      try {
        const result = await getAlerts(argv.state as string)
        console.log(result.message)
      }
      catch (error) {
        console.error('Error:', error instanceof Error ? error.message : error)
        process.exit(1)
      }
    },
  )
  .command(
    'get-forecast <latitude> <longitude>',
    'Get weather forecast for a location',
    (yargs) => {
      return yargs
        .positional('latitude', {
          describe: 'Latitude of the location',
          type: 'number',
          demandOption: true,
        })
        .positional('longitude', {
          describe: 'Longitude of the location',
          type: 'number',
          demandOption: true,
        })
    },
    async (argv) => {
      try {
        const result = await getForecast(argv.latitude as number, argv.longitude as number)
        console.log(result.message)
      }
      catch (error) {
        console.error('Error:', error instanceof Error ? error.message : error)
        process.exit(1)
      }
    },
  )
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version')
  .strict()

// 如果没有输入命令参数，默认启动服务器
if (process.argv.length === 2) {
  startServer().catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })
}
else {
  cli.parse()
}
