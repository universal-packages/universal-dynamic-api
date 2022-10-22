import { DynamicApi } from '../../../src'

describe('DynamicApi', (): void => {
  it('Load hooks and perform them by position', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/only-hooks-fail' })
    let error: Error

    await dynamicApi.loadDynamics()

    try {
      await dynamicApi.performDynamic('good', { call: 1, bad: true })
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('"good" does not implement dynamics only hooks')
  })
})
