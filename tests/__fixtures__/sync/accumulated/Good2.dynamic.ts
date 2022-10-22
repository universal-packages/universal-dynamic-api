import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('good')
export default class GoodDynamic2 {
  public static calls = []

  public perform(body: any): void {
    GoodDynamic2.calls.push(body)
    return body
  }
}
