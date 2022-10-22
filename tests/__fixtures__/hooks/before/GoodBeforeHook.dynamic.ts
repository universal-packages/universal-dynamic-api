import { DynamicHook } from '../../../../src/DynamicHook.decorator'

@DynamicHook('before', 'good')
export default class GoodBeforeHookDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    GoodBeforeHookDynamic.calls.push(body)
  }
}
