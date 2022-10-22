import { DynamicHook } from '../../../../../src/DynamicHook.decorator'

@DynamicHook('before', 'good')
export default class GoodBeforeHookDynamic2 {
  public static calls = []

  public perform(...args: any[]): void {
    GoodBeforeHookDynamic2.calls.push(args)
  }
}
