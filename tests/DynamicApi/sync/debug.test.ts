import { DynamicApi } from '../../../src'
import GoodDynamic from '../../__fixtures__/sync/all-good/Good.dynamic'

describe(DynamicApi, (): void => {
  it('Keeps track of calls if debug is enabled', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ debug: true, dynamicsLocation: './tests/__fixtures__/sync/all-good' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamicSync('good', { call: 1 })
    await dynamicApi.performDynamicSync('good', { call: 2, good: true })

    await dynamicApi.performDynamicSync('excellent', { call: 1 })
    await dynamicApi.performDynamicSync('excellent', { call: 2, excellent: true })

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

  it('Does not keep track of calls if debug is disabled', async (): Promise<void> => {
    DynamicApi.debugLog.length = 0
    const dynamicApi = new DynamicApi({ debug: false, dynamicsLocation: './tests/__fixtures__/sync/all-good' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamicSync('good', { call: 1 })
    await dynamicApi.performDynamicSync('good', { call: 2, good: true })

    await dynamicApi.performDynamicSync('excellent', { call: 1 })
    await dynamicApi.performDynamicSync('excellent', { call: 2, excellent: true })

    expect(DynamicApi.debugLog).toEqual([])
  })
})
