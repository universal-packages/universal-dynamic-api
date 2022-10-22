import { DynamicHook } from '../../../../src/DynamicHook.decorator'

@DynamicHook('after', 'good')
export default class GoodAfterHookDynamic2 {
  public static calls = []

  public async perform(...args: any[]): Promise<void> {
    GoodAfterHookDynamic2.calls.push(args)
  }
}
