import { Dynamic } from '../../../src/Dynamic.decorator'

@Dynamic('good')
export default class GoodDynamic {
  public static calls = []

  public async perform(body: any): Promise<void> {
    GoodDynamic.calls.push(body)
  }
}
