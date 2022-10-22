import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('excellent', true)
export default class DefaultExcellentDynamic {
  public static calls = []

  public perform(body: any): void {
    DefaultExcellentDynamic.calls.push(body)
  }
}
