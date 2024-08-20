import { DynamicApi } from '../../../src'
import ExcellentDynamic from '../../__fixtures__/sync/modules/Excellent.dynamic'
import GoodDynamic from '../../__fixtures__/sync/modules/Good.dynamic'

beforeEach((): void => {
  GoodDynamic.calls = []
  ExcellentDynamic.calls = []
})

describe(DynamicApi, (): void => {
  it('does not load dynamic modules only if they are enabled explicitly', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/sync/modules' })

    await dynamicApi.loadDynamics()

    let error: Error

    try {
      dynamicApi.performDynamicSync('good', { call: 1 })
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('"good" dynamic does not exist in this api')
  })

  it('Load dynamic modules only if they are enabled explicitly', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/sync/modules', modules: [{ name: 'good-module', enabled: true }] })

    await dynamicApi.loadDynamics()

    dynamicApi.performDynamicSync('good', { call: 1 })
    dynamicApi.performDynamicSync('good', { call: 2, good: true })

    let error: Error

    try {
      dynamicApi.performDynamicSync('excellent', { call: 1 })
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('"excellent" dynamic does not exist in this api')

    expect(GoodDynamic.calls).toEqual([{ call: 1 }, { call: 2, good: true }])
    expect(ExcellentDynamic.calls).toEqual([])
  })
})
