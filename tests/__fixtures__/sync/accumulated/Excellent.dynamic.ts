import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('excellent')
export default class ExcellentDynamic {
  public static calls = []

  public perform(body: any): any {
    ExcellentDynamic.calls.push(body)
    return body
  }
}
