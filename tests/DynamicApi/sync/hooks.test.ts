import { DynamicApi } from '../../../src'
import BadAfterHookDynamic from '../../__fixtures__/sync/hooks/after/BadAfterHook.dynamic'
import GoodAfterHookDynamic from '../../__fixtures__/sync/hooks/after/GoodAfterHook.dynamic'
import GoodAfterHookDynamic2 from '../../__fixtures__/sync/hooks/after/GoodAfterHook2.dynamic'
import BadBeforeHookDynamic from '../../__fixtures__/sync/hooks/before/BadBeforeHook.dynamic'
import GoodBeforeHookDynamic from '../../__fixtures__/sync/hooks/before/GoodBeforeHook.dynamic'
import GoodBeforeHookDynamic2 from '../../__fixtures__/sync/hooks/before/GoodBeforeHook2.dynamic'
import GoodDynamic from '../../__fixtures__/sync/hooks/Good.dynamic'

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
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/sync/hooks' })

    await dynamicApi.loadDynamics()

    GoodDynamic.callMeBefore = (): void => {
      expect(GoodBeforeHookDynamic.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
      expect(GoodBeforeHookDynamic2.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
      expect(GoodAfterHookDynamic.calls).toEqual([])
      expect(GoodAfterHookDynamic2.calls).toEqual([])
    }

    dynamicApi.performDynamicSync('good', { call: 1 })

    expect(GoodDynamic.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
    expect(GoodBeforeHookDynamic.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
    expect(GoodBeforeHookDynamic2.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
    expect(GoodAfterHookDynamic.calls).toEqual([[{ call: 1 }, 'Good called', expect.any(DynamicApi)]])
    expect(GoodAfterHookDynamic2.calls).toEqual([[{ call: 1 }, 'Good called', expect.any(DynamicApi)]])

    try {
      dynamicApi.performDynamicSync('bad', { call: 1, bad: true })
    } catch {}

    expect(BadBeforeHookDynamic.calls).toEqual([[{ call: 1, bad: true }, expect.any(DynamicApi)]])
    expect(BadAfterHookDynamic.calls).toEqual([])
  })

  it('after hooks receive the accumulated results if configured', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__/sync/hooks', accumulate: true })

    await dynamicApi.loadDynamics()

    dynamicApi.performDynamicSync('good', { call: 1 })

    expect(GoodDynamic.calls).toEqual([[{ call: 1 }, expect.any(DynamicApi)]])
    expect(GoodAfterHookDynamic.calls).toEqual([[{ call: 1 }, ['Good called'], expect.any(DynamicApi)]])
    expect(GoodAfterHookDynamic2.calls).toEqual([[{ call: 1 }, ['Good called'], expect.any(DynamicApi)]])
  })
})
