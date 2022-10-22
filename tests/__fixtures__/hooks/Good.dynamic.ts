import { Dynamic } from '../../../src/Dynamic.decorator'

@Dynamic('good')
export default class GoodDynamic {
  public static calls = []
  public static finishResolve: Function

  public async perform(...args: any[]): Promise<string> {
    return new Promise((resolve) => {
      GoodDynamic.finishResolve = () => {
        GoodDynamic.calls.push(args)
        resolve('Good called')
      }
    })
  }
}
