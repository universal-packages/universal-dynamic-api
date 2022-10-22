import { Dynamic } from '../../../src/Dynamic.decorator'

@Dynamic('good', true)
export default class DefaultGoodDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    DefaultGoodDynamic.calls.push(body)
  }
}
