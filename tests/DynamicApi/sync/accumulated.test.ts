import { DynamicApi } from '../../../src'
import GoodDynamic from '../../__fixtures__/sync/accumulated/Good.dynamic'
import GoodDynamic2 from '../../__fixtures__/sync/accumulated/Good2.dynamic'

describe('DynamicApi', (): void => {
  it('If configured it calls all dynamics with the same name and return all the results', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/sync/accumulated', accumulate: true })

    await dynamicApi.loadDynamics()

    expect(dynamicApi.performDynamicSync('good', { call: 1 })).toEqual([{ call: 1 }, { call: 1 }])
    expect(dynamicApi.performDynamicSync('good', { call: 2, good: true })).toEqual([
      { call: 2, good: true },
      { call: 2, good: true }
    ])

    expect(GoodDynamic.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
    expect(GoodDynamic2.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
  })
})
