import { DynamicApi } from '../../src'
import BadAfterHookDynamic from '../__fixtures__/hooks/after/BadAfterHook.dynamic'
import GoodAfterHookDynamic from '../__fixtures__/hooks/after/GoodAfterHook.dynamic'
import GoodAfterHookDynamic2 from '../__fixtures__/hooks/after/GoodAfterHook2.dynamic'
import BadBeforeHookDynamic from '../__fixtures__/hooks/before/BadBeforeHook.dynamic'
import GoodBeforeHookDynamic from '../__fixtures__/hooks/before/GoodBeforeHook.dynamic'
import GoodBeforeHookDynamic2 from '../__fixtures__/hooks/before/GoodBeforeHook2.dynamic'
import GoodDynamic from '../__fixtures__/hooks/Good.dynamic'

beforeEach((): void => {
  GoodDynamic.calls = []
  GoodAfterHookDynamic.calls = []
  GoodAfterHookDynamic2.calls = []
  BadBeforeHookDynamic.calls = []
  GoodBeforeHookDynamic.calls = []
  GoodBeforeHookDynamic2.calls = []
})

describe('DynamicApi', (): void => {
  it('Load hooks and perform them by position', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/only-hooks-fail' })
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
