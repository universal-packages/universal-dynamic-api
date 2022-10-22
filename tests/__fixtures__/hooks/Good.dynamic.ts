import { Dynamic } from '../../../src/Dynamic.decorator'

@Dynamic('good')
export default class GoodDynamic {
  public static calls = []
  public static finishResolve: Function

  public async perform(body: any): Promise<void> {
    return new Promise((resolve) => {
      GoodDynamic.finishResolve = () => {
        GoodDynamic.calls.push(body)
        resolve()
      }
    })
  }
}
