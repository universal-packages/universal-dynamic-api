import { DynamicHook } from '../../../../src/DynamicHook.decorator'

@DynamicHook('after', 'good')
export default class GoodAfterHookDynamic2 {
  public static calls = []

  public async perform(body: any): Promise<void> {
    GoodAfterHookDynamic2.calls.push(body)
  }
}
