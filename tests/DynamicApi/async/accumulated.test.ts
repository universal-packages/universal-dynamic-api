import { DynamicApi } from '../../../src'
import ExcellentDynamic2 from '../../__fixtures__/async/accumulated/Excellent2.dynamic'
import ExcellentDynamic from '../../__fixtures__/async/accumulated/Excellent.dynamic'
import GoodDynamic2 from '../../__fixtures__/async/accumulated/Good2.dynamic'
import GoodDynamic from '../../__fixtures__/async/accumulated/Good.dynamic'

describe(DynamicApi, (): void => {
  it('if configured it calls all dynamics with the same name and return all the results', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/accumulated', accumulate: true })

    await dynamicApi.loadDynamics()

    expect(await dynamicApi.performDynamic('excellent', { call: 1 })).toEqual([{ call: 1 }, { call: 1 }])
    expect(await dynamicApi.performDynamic('excellent', { call: 2, excellent: true })).toEqual([
      { call: 2, excellent: true },
      { call: 2, excellent: true }
    ])

    expect(ExcellentDynamic.calls).toEqual([{ call: 1 }, { call: 2, excellent: true }])
    expect(ExcellentDynamic2.calls).toEqual([{ call: 1 }, { call: 2, excellent: true }])
  })

  it('it returns only the first result if only one result', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/accumulated', accumulate: true })

    await dynamicApi.loadDynamics()

    expect(await dynamicApi.performDynamic('good', { call: 1 })).toEqual({ call: 1 })
    expect(await dynamicApi.performDynamic('good', { call: 2, good: true })).toEqual({ call: 2, good: true })

    expect(GoodDynamic.calls).toEqual([])
    expect(GoodDynamic2.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
  })
})
