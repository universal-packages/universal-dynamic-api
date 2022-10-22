import { DynamicHook } from '../../../../../src/DynamicHook.decorator'

@DynamicHook('after', 'good')
export default class GoodAfterHookDynamic {
  public static calls = []

  public async perform(...args: any[]): Promise<void> {
    GoodAfterHookDynamic.calls.push(args)
  }
}
