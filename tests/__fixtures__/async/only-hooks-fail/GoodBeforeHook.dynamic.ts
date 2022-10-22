import { DynamicHook } from '../../../../src/DynamicHook.decorator'

@DynamicHook('before', 'good')
export default class GoodBeforeHookDynamic {
  public static calls = []

  public async perform(...args: any[]): Promise<void> {
    GoodBeforeHookDynamic.calls.push(args)
  }
}
