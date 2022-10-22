import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('good')
export default class GoodDynamic2 {
  public static calls = []

  public async perform(body: any): Promise<void> {
    GoodDynamic2.calls.push(body)
    return body
  }
}
