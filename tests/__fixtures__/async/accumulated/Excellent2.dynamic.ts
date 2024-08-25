import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('excellent')
export default class ExcellentDynamic2 {
  public static calls = []

  public async perform(body: any): Promise<any> {
    ExcellentDynamic2.calls.push(body)
    return body
  }
}
