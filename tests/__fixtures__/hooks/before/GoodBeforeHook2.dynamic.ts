import { DynamicHook } from '../../../../src/DynamicHook.decorator'

@DynamicHook('before', 'good')
export default class GoodBeforeHookDynamic2 {
  public static calls = []

  public async perform(body: any): Promise<void> {
    GoodBeforeHookDynamic2.calls.push(body)
  }
}
