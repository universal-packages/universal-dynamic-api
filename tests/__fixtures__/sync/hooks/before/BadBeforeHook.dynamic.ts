import { DynamicHook } from '../../../../../src/DynamicHook.decorator'

@DynamicHook('before', 'bad')
export default class BadBeforeHookDynamic {
  public static calls = []

  public perform(...args: any[]): void {
    BadBeforeHookDynamic.calls.push(args)
  }
}
