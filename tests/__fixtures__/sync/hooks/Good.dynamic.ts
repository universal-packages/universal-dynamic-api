import { Dynamic } from '../../../../src/Dynamic.decorator'

@Dynamic('good')
export default class GoodDynamic {
  public static calls = []
  public static callMeBefore: Function

  public perform(...args: any[]): string {
    GoodDynamic.callMeBefore()

    GoodDynamic.calls.push(args)
    return 'Good called'
  }
}
