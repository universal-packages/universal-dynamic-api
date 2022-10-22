import { Dynamic } from '../../../src/Dynamic.decorator'

@Dynamic('excellent')
export default class ExcellentCoolDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    ExcellentCoolDynamic.calls.push(body)
  }
}
