import { DynamicApi } from '../../../src'
import DefaultExcellentDynamic from '../../__fixtures__/async/default-dynamic/DefaultExcellent.dynamic'
import DefaultGoodDynamic from '../../__fixtures__/async/default-dynamic/DefaultGood.dynamic'
import ExcellentDynamic from '../../__fixtures__/async/default-dynamic/Excellent.dynamic'

describe(DynamicApi, (): void => {
  it('perform dynamics by their default or by their first implementation even with default', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/default-dynamic' })

    await dynamicApi.loadDynamics()

    await dynamicApi.performDynamic('good', { call: 1 })
    await dynamicApi.performDynamic('good', { call: 2, good: true })

    await dynamicApi.performDynamic('excellent', { call: 1 })
    await dynamicApi.performDynamic('excellent', { call: 2, excellent: true })

    expect(DefaultGoodDynamic.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
    expect(DefaultExcellentDynamic.calls).toEqual([])
    expect(ExcellentDynamic.calls).toEqual([{ call: 1 }, { call: 2, excellent: true }])
  })
})
