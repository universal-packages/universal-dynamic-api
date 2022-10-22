import { DynamicApi } from '../../src'
import GoodDynamic from '../__fixtures__/accumulated/Good.dynamic'
import GoodDynamic2 from '../__fixtures__/accumulated/Good2.dynamic'

describe('DynamicApi', (): void => {
  it('If configured it calls all dynamics with the same name and return all the results', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/accumulated', accumulate: true })

    await dynamicApi.loadDynamics()

    expect(await dynamicApi.performDynamic('good', { call: 1 })).toEqual([{ call: 1 }, { call: 1 }])
    expect(await dynamicApi.performDynamic('good', { call: 2, good: true })).toEqual([
      { call: 2, good: true },
      { call: 2, good: true }
    ])

    expect(GoodDynamic.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
    expect(GoodDynamic2.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
  })
})
