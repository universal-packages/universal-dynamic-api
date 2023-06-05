import { DynamicApi } from '../../../src'
import GoodDynamic from '../../__fixtures__/async/all-good/Good.dynamic'

describe('DynamicApi', (): void => {
  it('Keeps track of calls if debug is enabled', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ debug: true, dynamicsLocation: './tests/__fixtures__/async/all-good' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamic('good', { call: 1 })
    await dynamicApi.performDynamic('good', { call: 2, good: true })

    await dynamicApi.performDynamic('excellent', { call: 1 })
    await dynamicApi.performDynamic('excellent', { call: 2, excellent: true })

    expect(GoodDynamic['__api']).toEqual(DynamicApi)

    expect(DynamicApi.debugLog).toEqual([
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
    DynamicApi.debugLog.length = 0
    const dynamicApi = new DynamicApi({ debug: false, dynamicsLocation: './tests/__fixtures__/async/all-good' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamic('good', { call: 1 })
    await dynamicApi.performDynamic('good', { call: 2, good: true })

    await dynamicApi.performDynamic('excellent', { call: 1 })
    await dynamicApi.performDynamic('excellent', { call: 2, excellent: true })

    expect(DynamicApi.debugLog).toEqual([])
  })
})
