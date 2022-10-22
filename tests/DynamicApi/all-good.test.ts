import { DynamicApi } from '../../src'
import ExcellentDynamic from '../__fixtures__/all-good/Excellent.dynamic'
import GoodDynamic from '../__fixtures__/all-good/Good.dynamic'

describe('DynamicApi', (): void => {
  it('Load dynamics and let call them', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/all-good' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamic('good', { call: 1 })
    await dynamicApi.performDynamic('good', { call: 2, good: true })

    await dynamicApi.performDynamic('excellent', { call: 1 })
    await dynamicApi.performDynamic('excellent', { call: 2, excellent: true })

    expect(GoodDynamic.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
    expect(ExcellentDynamic.calls).toEqual([{ call: 1 }, { call: 2, excellent: true }])
  })

  it('fails if the dynamic is not registered', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/all-good' })

    await dynamicApi.loadDynamics()

    let error: Error

    try {
      await dynamicApi.performDynamic('nop', { call: 1 })
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('"nop" dynamic does not exist in this api')
  })
})
