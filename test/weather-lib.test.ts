import { describe, expect, it } from 'vitest'
import { getAlerts, getForecast } from '../src/lib/weather'

describe('weather lib', () => {
  it('getAlerts should be a function', () => {
    expect(typeof getAlerts).toBe('function')
  })

  it('getForecast should be a function', () => {
    expect(typeof getForecast).toBe('function')
  })

  // Note: Actual API tests would require mocking or integration testing
  // These tests verify the core business logic functions exist and are properly typed
})
