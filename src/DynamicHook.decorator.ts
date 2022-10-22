import { DynamicHookPosition } from './DynamicApi.types'

export function DynamicHook(lifeCycle: DynamicHookPosition, name: string) {
  return (target: any): void => {
    target.__name = name
    target.__lifeCycle = lifeCycle
  }
}
