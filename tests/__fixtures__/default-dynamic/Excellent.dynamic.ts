import { Dynamic } from '../../../src/Dynamic.decorator'

@Dynamic('excellent')
export default class ExcellentDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    ExcellentDynamic.calls.push(body)
  }
}
