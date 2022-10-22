import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('excellent')
export default class ExcellentCoolDynamic {
  public static calls = []

  public perform(body: any): void {
    ExcellentCoolDynamic.calls.push(body)
  }
}
