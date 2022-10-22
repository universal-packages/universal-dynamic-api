import { DynamicHook } from '../../../../src/DynamicHook.decorator'

@DynamicHook('after', 'bad')
export default class BadAfterHookDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    BadAfterHookDynamic.calls.push(body)
  }
}
