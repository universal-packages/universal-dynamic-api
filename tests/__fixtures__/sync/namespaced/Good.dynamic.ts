import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('good')
export default class GoodDynamic {
  public static calls = []

  public perform(body: any): void {
    GoodDynamic.calls.push(body)
  }
}
