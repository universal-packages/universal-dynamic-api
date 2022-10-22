import { DynamicHook } from '../../../../../src/DynamicHook.decorator'

@DynamicHook('after', 'good')
export default class GoodAfterHookDynamic {
  public static calls = []

  public perform(...args: any[]): void {
    GoodAfterHookDynamic.calls.push(args)
  }
}
