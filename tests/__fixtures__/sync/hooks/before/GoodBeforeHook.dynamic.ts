import { DynamicHook } from '../../../../../src/DynamicHook.decorator'

@DynamicHook('before', 'good')
export default class GoodBeforeHookDynamic {
  public static calls = []

  public perform(...args: any[]): void {
    GoodBeforeHookDynamic.calls.push(args)
  }
}
