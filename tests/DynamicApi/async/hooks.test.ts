import { DynamicApi } from '../../../src'
import GoodDynamic from '../../__fixtures__/async/hooks/Good.dynamic'
import BadAfterHookDynamic from '../../__fixtures__/async/hooks/after/BadAfterHook.dynamic'
import GoodAfterHookDynamic2 from '../../__fixtures__/async/hooks/after/GoodAfterHook2.dynamic'
import GoodAfterHookDynamic from '../../__fixtures__/async/hooks/after/GoodAfterHook.dynamic'
import BadBeforeHookDynamic from '../../__fixtures__/async/hooks/before/BadBeforeHook.dynamic'
import GoodBeforeHookDynamic2 from '../../__fixtures__/async/hooks/before/GoodBeforeHook2.dynamic'
import GoodBeforeHookDynamic from '../../__fixtures__/async/hooks/before/GoodBeforeHook.dynamic'

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
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/hooks' })

    await dynamicApi.loadDynamics()

    setTimeout((): void => {
      expect(GoodBeforeHookDynamic.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
      expect(GoodBeforeHookDynamic2.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
      expect(GoodAfterHookDynamic.calls).toEqual([])
      expect(GoodAfterHookDynamic2.calls).toEqual([])

      GoodDynamic.finishResolve()
    }, 500)

    await dynamicApi.performDynamic('good', { call: 1 })

    expect(GoodDynamic.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
    expect(GoodBeforeHookDynamic.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
    expect(GoodBeforeHookDynamic2.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
    expect(GoodAfterHookDynamic.calls).toEqual([[{ call: 1 }, 'Good called', expect.any(DynamicApi)]])
    expect(GoodAfterHookDynamic2.calls).toEqual([[{ call: 1 }, 'Good called', expect.any(DynamicApi)]])

    try {
      await dynamicApi.performDynamic('bad', { call: 1, bad: true })
    } catch {}

    expect(BadBeforeHookDynamic.calls).toEqual([[{ call: 1, bad: true }, expect.any(DynamicApi)]])
    expect(BadAfterHookDynamic.calls).toEqual([])
  })

  it('after hooks receive the accumulated results if configured', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/async/hooks', accumulate: true })

    await dynamicApi.loadDynamics()

    setTimeout((): void => GoodDynamic.finishResolve(), 500)
    await dynamicApi.performDynamic('good', { call: 1 })

    expect(GoodDynamic.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
    expect(GoodAfterHookDynamic.calls).toEqual([[{ call: 1 }, ['Good called'], expect.any(DynamicApi)]])
    expect(GoodAfterHookDynamic2.calls).toEqual([[{ call: 1 }, ['Good called'], expect.any(DynamicApi)]])
  })
})
