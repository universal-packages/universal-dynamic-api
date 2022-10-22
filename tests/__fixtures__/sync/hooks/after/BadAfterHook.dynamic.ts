import { DynamicHook } from '../../../../../src/DynamicHook.decorator'

@DynamicHook('after', 'bad')
export default class BadAfterHookDynamic {
  public static calls = []

  public perform(body: any): void {
    BadAfterHookDynamic.calls.push(body)
  }
}
