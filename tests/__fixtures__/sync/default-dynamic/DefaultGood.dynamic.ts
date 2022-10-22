import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('good', true)
export default class DefaultGoodDynamic {
  public static calls = []

  public perform(body: any): void {
    DefaultGoodDynamic.calls.push(body)
  }
}
