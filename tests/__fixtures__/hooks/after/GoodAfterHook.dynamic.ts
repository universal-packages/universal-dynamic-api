import { DynamicHook } from '../../../../src/DynamicHook.decorator'

@DynamicHook('after', 'good')
export default class GoodAfterHookDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    GoodAfterHookDynamic.calls.push(body)
  }
}
