import { DynamicApi } from '../../../src'

describe(DynamicApi, (): void => {
  it('fails when loading dynamics with errors', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/not-default-export' })
    let error: Error

    try {
      await dynamicApi.loadDynamics()
    } catch (err) {
      error = err
    }

    expect(error.message).toMatch(/Dynamics should export a default class\n.*__fixtures__\/async\/not-default-export\/NotDefault.dynamic.ts/)
  })
})
