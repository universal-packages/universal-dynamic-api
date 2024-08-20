import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('excellent-module', 'excellent')
export default class ExcellentDynamic {
  public static calls = []

  public perform(body: any): void {
    ExcellentDynamic.calls.push(body)
  }
}
