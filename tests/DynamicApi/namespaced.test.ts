import { DynamicApi } from '../../src'
import ExcellentCoolDynamic from '../__fixtures__/namespaced/Excellent.cool-dynamic'

describe('DynamicApi', (): void => {
  it('Load dynamics for a certain namespace', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/namespaced', namespace: 'cool' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamic('excellent', { call: 1 })
    await dynamicApi.performDynamic('excellent', { call: 2, excellent: true })

    expect(ExcellentCoolDynamic.calls).toEqual([{ call: 1 }, { call: 2, excellent: true }])

    let error: Error

    try {
      await dynamicApi.performDynamic('good', { call: 1 })
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('"good" dynamic does not exist in this api')
  })
})
