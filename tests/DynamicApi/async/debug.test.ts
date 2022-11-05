import { DynamicApi } from '../../../src'

describe('DynamicApi', (): void => {
  it('Keeps track of calls if debug is enabled', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ debug: true, dynamicsLocation: './tests/__fixtures__/async/all-good' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamic('good', { call: 1 })
    await dynamicApi.performDynamic('good', { call: 2, good: true })

    await dynamicApi.performDynamic('excellent', { call: 1 })
    await dynamicApi.performDynamic('excellent', { call: 2, excellent: true })

    expect(dynamicApi.debugLog).toEqual([
      {
        name: 'good',
        payload: { call: 1 },
        results: [undefined],
        hooks: { after: [], before: [] }
      },
      {
        name: 'good',
        payload: { call: 2, good: true },
        results: [undefined],
        hooks: { after: [], before: [] }
      },
      {
        name: 'excellent',
        payload: { call: 1 },
        results: [undefined],
        hooks: { after: [], before: [] }
      },
      {
        name: 'excellent',
        payload: { call: 2, excellent: true },
        results: [undefined],
        hooks: { after: [], before: [] }
      }
    ])
  })

  it('Does not Keep track of calls if debug is disabled', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ debug: false, dynamicsLocation: './tests/__fixtures__/async/all-good' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamic('good', { call: 1 })
    await dynamicApi.performDynamic('good', { call: 2, good: true })

    await dynamicApi.performDynamic('excellent', { call: 1 })
    await dynamicApi.performDynamic('excellent', { call: 2, excellent: true })

    expect(dynamicApi.debugLog).toEqual([])
  })
})
