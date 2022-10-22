import { DynamicApi } from '../../../src'

describe('DynamicApi', (): void => {
  it('fails when loading dynamics with errors', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/sync/errored' })
    let error: Error

    try {
      await dynamicApi.loadDynamics()
    } catch (err) {
      error = err
    }

    expect(error).toEqual('Error')
  })
})
