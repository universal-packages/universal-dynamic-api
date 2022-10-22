import { DynamicHook } from '../../../../../src/DynamicHook.decorator'

@DynamicHook('after', 'good')
export default class GoodAfterHookDynamic2 {
  public static calls = []

  public perform(...args: any[]): void {
    GoodAfterHookDynamic2.calls.push(args)
  }
}
