import { Dynamic } from '../../../src/Dynamic.decorator'

@Dynamic('excellent', true)
export default class DefaultExcellentDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    DefaultExcellentDynamic.calls.push(body)
  }
}
