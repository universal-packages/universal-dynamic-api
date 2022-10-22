import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('good', true)
export default class GoodDynamic {
  public static calls = []

  public perform(body: any): void {
    GoodDynamic.calls.push(body)
    return body
  }
}
