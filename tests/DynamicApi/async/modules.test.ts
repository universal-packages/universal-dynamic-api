import { DynamicApi } from '../../../src'
import ExcellentDynamic from '../../__fixtures__/async/modules/Excellent.dynamic'
import GoodDynamic from '../../__fixtures__/async/modules/Good.dynamic'

beforeEach((): void => {
  GoodDynamic.calls = []
  ExcellentDynamic.calls = []
})

describe(DynamicApi, (): void => {
  it('does not load dynamic modules only if they are enabled explicitly', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/modules' })

    await dynamicApi.loadDynamics()

    let error: Error

    try {
      await dynamicApi.performDynamic('good', { call: 1 })
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('"good" dynamic does not exist in this api')
  })

  it('Load dynamic modules only if they are enabled explicitly', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/modules', modules: [{ name: 'good-module', enabled: true }] })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamic('good', { call: 1 })
    await dynamicApi.performDynamic('good', { call: 2, good: true })

    let error: Error

    try {
      await dynamicApi.performDynamic('excellent', { call: 1 })
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('"excellent" dynamic does not exist in this api')

    expect(GoodDynamic.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
    expect(ExcellentDynamic.calls).toEqual([])
  })
})
