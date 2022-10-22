import { DynamicHook } from '../../../../src/DynamicHook.decorator'

@DynamicHook('before', 'bad')
export default class BadBeforeHookDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    BadBeforeHookDynamic.calls.push(body)
  }
}
