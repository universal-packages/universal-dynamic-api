import { DynamicHookPosition } from './types'

export function DynamicHook<D = Record<string, any>>(lifeCycle: DynamicHookPosition, name: keyof D) {
  return (target: any): void => {
    target.__name = name
    target.__lifeCycle = lifeCycle
  }
}
