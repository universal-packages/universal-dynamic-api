import { DynamicApi } from '../../../src'

describe('DynamicApi', (): void => {
  it('fails when loading dynamics with errors', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/not-use-decorator' })
    let error: Error

    try {
      await dynamicApi.loadDynamics()
    } catch (err) {
      error = err
    }

    expect(error.message).toMatch(/Dynamics should be decorated with @Dynamic or @DynamicHook\n.*__fixtures__\/async\/not-use-decorator\/NotUseDecorator.dynamic.ts/)
  })
})
