import type { AlertsResponse, ForecastPeriod, ForecastResponse, PointsResponse } from '../types'
import { NWS_API_BASE } from '../constants'
import { formatAlert, makeNWSRequest } from '../utils'

/**
 * Get weather alerts for a state
 */
export async function getAlerts(state: string) {
  const stateCode = state.toUpperCase()
  const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`
  const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl)

  if (!alertsData) {
    throw new Error('Failed to retrieve alerts data')
  }

  const features = alertsData.features || []
  if (features.length === 0) {
    return {
      state: stateCode,
      alerts: [],
      message: `No active alerts for ${stateCode}`,
    }
  }

  const formattedAlerts = features.map(formatAlert)
  return {
    state: stateCode,
    alerts: formattedAlerts,
    message: `Active alerts for ${stateCode}:\n\n${formattedAlerts.join('\n')}`,
  }
}

/**
 * Get weather forecast for a location
 */
export async function getForecast(latitude: number, longitude: number) {
  // Get grid point data
  const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`
  const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl)

  if (!pointsData) {
    throw new Error(
      `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}. This location may not be supported by the NWS API (only US locations are supported).`,
    )
  }

  const forecastUrl = pointsData.properties?.forecast
  if (!forecastUrl) {
    throw new Error('Failed to get forecast URL from grid point data')
  }

  // Get forecast data
  const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl)
  if (!forecastData) {
    throw new Error('Failed to retrieve forecast data')
  }

  const periods = forecastData.properties?.periods || []
  if (periods.length === 0) {
    throw new Error('No forecast periods available')
  }

  // Format forecast periods
  const formattedPeriods = periods.map((period: ForecastPeriod) =>
    [
      `${period.name || 'Unknown'}:`,
      `Temperature: ${period.temperature || 'Unknown'}°${period.temperatureUnit || 'F'}`,
      `Wind: ${period.windSpeed || 'Unknown'} ${period.windDirection || ''}`,
      `${period.shortForecast || 'No forecast available'}`,
      '---',
    ].join('\n'),
  )

  return {
    latitude,
    longitude,
    periods: formattedPeriods,
    message: `Forecast for ${latitude}, ${longitude}:\n\n${formattedPeriods.join('\n')}`,
  }
}
