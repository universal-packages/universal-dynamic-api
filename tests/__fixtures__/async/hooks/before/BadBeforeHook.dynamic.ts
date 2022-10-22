import { DynamicHook } from '../../../../../src/DynamicHook.decorator'

@DynamicHook('before', 'bad')
export default class BadBeforeHookDynamic {
  public static calls = []

  public async perform(...args: any[]): Promise<void> {
    BadBeforeHookDynamic.calls.push(args)
  }
}
